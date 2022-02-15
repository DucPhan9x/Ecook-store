import createHttpError from "http-errors";
import Mongoose from "mongoose";
import { User } from "../models";

const getListCustomers = async (req, res, next) => {
  try {
    const { searchText } = req.query; // employeeType===3: employee, ===4 instructor
    let filter;
    filter = {
      ...filter,
      roleId: 1,
    };
    if (searchText) {
      filter = {
        ...filter,
        email: {
          $regex: searchText,
        },
      };
    }

    let listCustomers = await User.aggregate([
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
    listCustomers = listCustomers.map((x) => {
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
      msg: "Get list customer successfully!",
      employees: listEmployees,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await User.aggregate([
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
          _id: Mongoose.Types.ObjectId(customerId),
        },
      },
    ]);
    if (!customer) {
      throw createHttpError(400, "Customer is not exist!");
    }
    res.status(200).json({
      status: 200,
      msg: "Get an customer successfully!",
      employee: {
        _id: customer[0]._id,
        email: customer[0].email,
        roleId: customer[0].roleId,
        createAt: customer[0].createAt,
        phoneNumber: customer[0].userDetail[0].phoneNumber,
        fullName: customer[0].userDetail[0].fullName,
        dateOfBirth: customer[0].userDetail[0].dateOfBirth,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const banCustomerById = async (req, res, next) => {
  try {
    const customerIds = req.body.customerIds;
    for (var i = 0; i < customerIds.length; i++) {
      const customer = await User.findOneAndUpdate({
        _id: customerIds[i],
        isRemoved: true,
      });
      if (!customer) {
        throw createHttpError(400, "The customer(s) is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: "Ban customer(s) successfully!",
      customerIds,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const customerController = {
  getListCustomers,
  getCustomerById,
  banCustomerById,
};
