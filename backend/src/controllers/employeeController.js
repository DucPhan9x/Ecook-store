import createHttpError from "http-errors";
import { User, UserDetail } from "../models";
import { sendEmail } from "../utils";
import bcrypt from "bcryptjs";
import Mongoose from "mongoose";
import crypto from "crypto";
import { envVariables } from "../configs";

const getListEmployees = async (req, res, next) => {
  try {
    let { searchText, employeeType } = req.query;

    let employees;
    employeeType = Number(employeeType);
    let role = employeeType || { $in: [3, 4] };
    console.log(role);
    let userIds = await User.find({
      roleId: role,
    });
    userIds = userIds.map((i) => i._id);

    if (searchText) {
      if (employeeType) {
        let regex = new RegExp([searchText].join(""), "i");
        employees = await UserDetail.find({
          fullName: { $regex: regex },
          userId: { $in: userIds },
        });
      } else {
        let regex = new RegExp([searchText].join(""), "i");
        employees = await UserDetail.find({
          fullName: { $regex: regex },
          userId: { $in: userIds },
        });
      }
    } else {
      if (employeeType) {
        employees = await UserDetail.find({
          userId: { $in: userIds },
        });
      } else {
        employees = await UserDetail.find({
          userId: { $in: userIds },
        });
      }
    }

    let users = employees.map((i) => User.findById(i.userId));
    users = await Promise.all(users);

    employees = employees.map((item, idx) => ({
      ...item._doc,
      email: users[idx].email,
      roleId: users[idx].roleId,
      isActive: users[idx].isActive,
      _id: users[idx]._id,
    }));

    res.status(200).json({
      status: 200,
      msg: "Get list employee successfully!",
      employees,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createNewEmployee = async (req, res, next) => {
  const { email, password, fullName, phoneNumber, address, employeeType } =
    req.body;
  try {
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      throw createHttpError(400, "This email is used by others!");
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const activeToken = await crypto
      .createHash("md5")
      .update(Math.random().toString().substring(2))
      .digest("hex");
    // send link to active account
    const message = `Click to active(old password: ${password}): <a href="${envVariables.baseUrl}api/v1/auth/confirm/${activeToken}">Activate</a>`;
    await sendEmail(email, "Active your account", "", message);
    const newUser = await User.create({
      email,
      password: hashPassword,
      roleId: employeeType,
      createAt: Date.now(),
      isActive: false,
      activeToken,
    });

    const userDetail = await UserDetail.create({
      userId: newUser._id,
      fullName,
      phoneNumber,
      address,
    });

    res.status(200).json({
      status: 200,
      msg: "Create a new employee successfully!",
      employee: {
        userId: newUser._id,
        email: newUser.email,
        roleId: newUser.roleId,
        createAt: new Date(),
        phoneNumber: userDetail.phoneNumber,
        fullName: userDetail.fullName,
        isActive: false,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const employee = await User.aggregate([
      {
        $lookup: {
          from: "UserDetail",
          localField: "_id",
          foreignField: "userId",
          as: "userDetail",
        },
      },
      {
        $match: {
          _id: Mongoose.Types.ObjectId(employeeId),
        },
      },
    ]);
    if (!employee) {
      throw createHttpError(400, "EmployeeId is not exist!");
    }
    res.status(200).json({
      status: 200,
      msg: "Get an employee successfully!",
      employee: {
        _id: employee[0]._id,
        email: employee[0].email,
        roleId: employee[0].roleId,
        createAt: employee[0].createAt,
        phoneNumber: employee[0].userDetail[0].phoneNumber,
        fullName: employee[0].userDetail[0].fullName,
        dateOfBirth: employee[0].userDetail[0].dateOfBirth,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateEmployeeById = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const { fullName, phoneNumber, dateOfBirth } = req.body;
    const em = await UserDetail.findOneAndUpdate(
      { userId: employeeId },
      {
        fullName,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
      }
    );

    if (!em) {
      throw createHttpError(400, "Employee is not exist");
    }

    const newEmployee = await UserDetail.findOne({ userId: employeeId });

    res.status(200).json({
      status: 200,
      msg: "Update an employee successfully!",
      employee: newEmployee,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const employeeIds = req.body.employeeIds;
    for (var i = 0; i < employeeIds.length; i++) {
      const employee = await Promise.all([
        User.findOneAndDelete({
          _id: employeeIds[i],
        }),

        UserDetail.findOneAndDelete({ userId: employeeIds[i] }),
      ]);
      if (!employee) {
        throw createHttpError(400, "An employee is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: "Delete employee(s) successfully!",
      employeeIds,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const banEmployeeById = async (req, res, next) => {
  try {
    const { isBanned, employeeIds } = req.body;
    for (var i = 0; i < employeeIds.length; i++) {
      const employee = await Promise.all([
        User.findOneAndUpdate({ _id: employeeIds[i] }, { isRemoved: isBanned }),

        UserDetail.findOneAndUpdate(
          { userId: employeeIds[i] },
          {
            isRemoved: isBanned,
          }
        ),
      ]);
      if (!employee) {
        throw createHttpError(400, "Employee is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: `${isBanned ? "Ban" : "Un-Ban"} employee(s) successfully!`,
      employeeIds,
      isBanned,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const employeeController = {
  getListEmployees,
  getEmployeeById,
  createNewEmployee,
  deleteEmployeeById,
  banEmployeeById,
  updateEmployeeById,
};
