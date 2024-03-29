import createHttpError from "http-errors";
import Mongoose from "mongoose";
import { User, UserDetail } from "../models";

const getListCustomers = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "userId";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfCustomers;
    let customers;
    let userIds = await User.find({ roleId: 1 });
    userIds = userIds.map((i) => i._id);

    console.log(userIds);

    if (searchText) {
      let regex = new RegExp([searchText].join(""), "i");
      customers = await UserDetail.find({
        fullName: { $regex: regex },
        userId: { $in: userIds },
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCustomers = await UserDetail.find({
        fullName: { $regex: regex },
        userId: { $in: userIds },
      }).count();
    } else {
      customers = await UserDetail.find({ userId: { $in: userIds } })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfCustomers = await UserDetail.find({
        userId: { $in: userIds },
      }).count();
    }

    const totalPage = parseInt(totalNumOfCustomers / numOfPerPage) + 1;

    let users = customers.map((i) => User.findById(i.userId));
    users = await Promise.all(users);

    customers = customers.map((item, idx) => ({
      ...item._doc,
      email: users[idx].email,
      _id: users[idx]._id,
    }));

    res.status(200).json({
      status: 200,
      msg: "Get list customer successfully!",
      customers,
      totalRows: totalNumOfCustomers,
      totalPage,
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
      customer: {
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
    const { customerIds, isBanned } = req.body;
    console.log(req.body);
    for (var i = 0; i < customerIds.length; i++) {
      const customer = await Promise.all([
        User.findOneAndUpdate(
          { _id: customerIds[i] },
          {
            isRemoved: isBanned,
          }
        ),

        UserDetail.findOneAndUpdate(
          { userId: customerIds[i] },
          {
            isRemoved: isBanned,
          }
        ),
      ]);
      if (!customer) {
        throw createHttpError(400, "Customer is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: `${isBanned ? "Ban" : "Un-Ban"} customer(s) successfully!`,
      customerIds,
      isBanned,
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
