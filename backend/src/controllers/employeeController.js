import createHttpError from "http-errors";
import { User, UserDetail } from "../models";
import { sendEmail } from "../utils";
import Mongoose from "mongoose";

const getListEmployees = async (req, res, next) => {
  try {
    const { searchText, employeeType } = req.query; // employeeType===3: employee, ===4 instructor
    let filter;
    if (employeeType) {
      filter = {
        ...filter,
        roleId: employeeType,
      };
    }
    if (searchText) {
      filter = {
        ...filter,
        email: {
          $regex: searchText,
        },
      };
    }

    let listEmployees = await User.aggregate([
      {
        $lookup: {
          from: "UserDetail",
          localField: "_id",
          foreignField: "userId",
          as: "userDetail",
        },
      },
      {
        $match: filter,
      },
    ]);
    listEmployees = listEmployees.map((x) => {
      return {
        _id: x._id,
        email: x.email,
        roleId: x.roleId,
        fullName: x.userDetail[0].fullName,
        phoneNumber: x.userDetail[0].phoneNumber,
        dateOfBirth: x.userDetail[0].dateOfBirth,
        address: x.userDetail[0].address,
        imageUrl: x.userDetail[0].imageUrl,
      };
    });
    res.status(200).json({
      status: 200,
      msg: "Get list employee successfully!",
      employees: listEmployees,
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
      return;
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashPassword,
      roleId: employeeType,
    });

    const userDetail = await UserDetail.create({
      userId: newUser._id,
      fullName,
      phoneNumber,
      address,
    });
    const activeToken = await crypto
      .createHash("md5")
      .update(Math.random().toString().substring(2))
      .digest("hex");
    // send link to active account
    const message = `Click to active(old password: ${password}): <a href="${envVariables.baseUrl}api/v1/auth/confirm/${activeToken}">Activate</a>`;
    await sendEmail(email, "Active your account", "", message);

    res.status(201).json({
      status: 201,
      msg: "Create a new employee successfully!",
      employee: {
        userId: newUser._id,
        email: newUser.email,
        roleId: newUser.roleId,
        createAt: new Date(),
        phoneNumber: userDetail.phoneNumber,
        fullName: userDetail.fullName,
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
    await UserDetail.findOneAndUpdate(
      { userId: employeeId },
      {
        fullName,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
      }
    );
    res.status(200).json({
      status: 200,
      msg: "Update an employee successfully!",
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
        User.findOneAndDelete({ _id: employeeIds[i], roleId: 2 }),

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
    const employeeIds = req.body.employeeIds;
    for (var i = 0; i < employeeIds.length; i++) {
      const employee = await User.findOneAndUpdate({
        _id: employeeIds[i],
        isRemoved: true,
      });
      if (!employee) {
        throw createHttpError(400, "The employee(s) is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: "Ban employee(s) successfully!",
      employeeIds,
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
