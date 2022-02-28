import request from "request";
import createHttpError from "http-errors";
import { Food, Voucher, Order, Course, UserDetail, CartItem } from "../models";
import {
  calculateItemPrice,
  calculateTotalPrice,
  distanceBetween2Points,
  getShipmentFee,
} from "../utils";
import Mongoose from "mongoose";
import { convertVNDToUSD } from "../utils/calPrice";
import { envVariables, geocoder } from "../configs";

const { PAYPAL_API, clientIdPaypal, clientSecretPaypal } = envVariables;

const paypalPayment = async (req, res, next) => {
  try {
    const paymentID = req.body.paymentID;
    const payerID = req.body.payerID;
    const order = req.body.order;

    let merchandiseSubtotal =
      order.items.reduce((f, s) => f + s.quantity * s.unitPrice, 0) +
      order.shipmentFee;

    if (order.voucherId) {
      const voucher = order.voucherData;
      if (merchandiseSubtotal * voucher.discountOff > voucher.discountMaximum) {
        merchandiseSubtotal -= voucher.discountMaximum;
      } else {
        merchandiseSubtotal -= merchandiseSubtotal * voucher.discountOff;
      }
    }

    await request.post(
      PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
      {
        auth: {
          user: clientIdPaypal,
          pass: clientSecretPaypal,
        },
        body: {
          payer_id: payerID,
          transactions: [
            {
              amount: {
                total: parseFloat(convertVNDToUSD(merchandiseSubtotal))
                  .toFixed(2)
                  .toString(),
                currency: "USD",
              },
            },
          ],
        },
        json: true,
      },
      async function (err, response) {
        if (err) {
          console.error(err);
          throw createHttpError(500, "Paypal server error");
        }
        try {
          await createNewOrder(req);
          // remove cart items
          let cartItemIds = order.items.map((i) => i._id);
          const cartItems = await CartItem.deleteMany({
            _id: {
              $in: cartItemIds,
            },
          });
          if (!cartItems) {
            throw createHttpError(404, "Not found food in the cart(s)");
          }

          res.status(200).json({
            msg: "Payment by paypal successfully!",
            status: 200,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const createNewOrder = async (req) => {
  try {
    const { address, items, voucherId } = req.body.order;
    const addressTemp = address.includes("-")
      ? address.replaceAll("-", ",")
      : address;

    const customerCoordinate = await geocoder.geocode(addressTemp);
    const myCoordinate = await geocoder.geocode(envVariables.MY_ADDRESS);
    const distance = distanceBetween2Points(
      customerCoordinate[0].latitude,
      customerCoordinate[0].longitude,
      myCoordinate[0].latitude,
      myCoordinate[0].longitude
    );
    const shipmentFee = getShipmentFee(distance);
    await Promise.all(
      items.map((item) =>
        Food.findOne({ _id: Mongoose.Types.ObjectId(item.itemId) })
      )
    );
    const orderItems = items;

    const merchandiseSubtotal = orderItems.reduce(
      (total, currentValue, currentIndex) => {
        return (
          total +
          calculateItemPrice(
            currentValue.unitPrice,
            currentValue.quantity,
            0,
            0
          )
        );
      },
      0
    );
    let data = {
      address,
      customerId: req.user._id,
      isPaid: true,
      paymentMethod: "paypal",
      merchandiseSubtotal,
      shipmentFee,
      items: orderItems,
      statusId: 1,
      orderType: 1,
    };
    let total;
    if (voucherId) {
      const voucher = await Voucher.findOne({ _id: voucherId });

      if (voucher.remainingSlot) {
        await Voucher.findByIdAndUpdate(voucherId, {
          remainingSlot: voucher.remainingSlot - 1,
        });
      }
      total = calculateTotalPrice(
        merchandiseSubtotal,
        voucher.discountOff,
        voucher.discountMaximum,
        shipmentFee
      );
      data = { ...data, voucherId };
    } else {
      total = merchandiseSubtotal + shipmentFee;
    }
    await Order.create({ ...data, total });
    // create payment code
  } catch (error) {
    console.log(error);
    throw createHttpError(400, error);
  }
};

const createNewOrderCourse = async (req) => {
  try {
    const { items, voucherId } = req.body.order;
    const shipmentFee = 0;
    const courses = await Promise.all(
      items.map((item) =>
        Course.findOne({ _id: Mongoose.Types.ObjectId(item.itemId) })
      )
    );

    const orderItems = items;
    // order items da tinh discountOff voi discountMaximum(unitPrice)
    const merchandiseSubtotal = orderItems.reduce(
      (total, currentValue, currentIndex) => {
        return (
          total +
          calculateItemPrice(
            currentValue.unitPrice,
            currentValue.quantity,
            0,
            0
          )
        );
      },
      0
    );
    let data = {
      address: "",
      customerId: req.user._id,
      isPaid: true,
      paymentMethod: "paypal",
      merchandiseSubtotal,
      shipmentFee: 0,
      items: orderItems,
      statusId: 4, // da thanh toan
      orderType: 2, // course
    };
    let total;
    if (voucherId) {
      const voucher = await Voucher.findOne({ _id: voucherId });

      if (voucher.remainingSlot) {
        await Voucher.findByIdAndUpdate(voucherId, {
          remainingSlot: voucher.remainingSlot - 1,
        });
      }
      total = calculateTotalPrice(
        merchandiseSubtotal,
        voucher.discountOff,
        voucher.discountMaximum,
        shipmentFee
      );
      data = { ...data, voucherId };
    } else {
      total = merchandiseSubtotal + shipmentFee;
    }
    await Order.create({ ...data, total });

    // add courses into courseList of student
    const customer = await UserDetail.findOne({ userId: req.user._id });
    let courseListBefore = customer.courseList;
    courseListBefore = courseListBefore.concat(
      courses.map((item) => ({
        ...item,
        studentBuyAt: new Date(),
      }))
    );
    await UserDetail.findOneAndUpdate(
      { userId: req.user._id },
      {
        courseList: courseListBefore,
      }
    );

    // create payment code
  } catch (error) {
    console.log(error);
    throw createHttpError(400, error);
  }
};

const paymentRedirectMoney = async (req, res, next) => {
  try {
    const { address, items, voucherId, shipmentFee } = req.body.order;
    const orderItems = items;
    const merchandiseSubtotal = orderItems.reduce(
      (total, currentValue, currentIndex) => {
        return (
          total +
          calculateItemPrice(
            currentValue.unitPrice,
            currentValue.quantity,
            0,
            0
          )
        );
      },
      0
    );
    let data = {
      address,
      customerId: req.user._id,
      isPaid: false,
      paymentMethod: "direct",
      merchandiseSubtotal,
      shipmentFee,
      items: orderItems,
      statusId: 1,
      orderType: 1,
    };
    let total;
    if (voucherId) {
      const voucher = await Voucher.findOne({ _id: voucherId });

      if (voucher.remainingSlot) {
        await Voucher.findByIdAndUpdate(voucherId, {
          remainingSlot: voucher.remainingSlot - 1,
        });
      }
      total = calculateTotalPrice(
        merchandiseSubtotal,
        voucher.discountOff,
        voucher.discountMaximum,
        shipmentFee
      );
      data = { ...data, voucherId };
    } else {
      total = merchandiseSubtotal + shipmentFee;
    }
    await Order.create({ ...data, total });

    // remove cart items
    let cartItemIds = items.map((i) => i._id);
    const cartItems = await CartItem.deleteMany({
      _id: {
        $in: cartItemIds,
      },
    });
    if (!cartItems) {
      throw createHttpError(404, "Not found food in the cart(s)");
    }
    res.status(200).json({
      msg: "Đã đặt hàng thành công!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(400, error);
  }
};
const paypalPaymentCourse = async (req, res, next) => {
  try {
    const paymentID = req.body.paymentID;
    const payerID = req.body.payerID;
    const order = req.body.order;

    let merchandiseSubtotal = order.items.reduce(
      (f, s) => f + 1 * s.unitPrice,
      0
    );

    if (order.voucherId) {
      const voucher = order.voucherData;
      if (merchandiseSubtotal * voucher.discountOff > voucher.discountMaximum) {
        merchandiseSubtotal -= voucher.discountMaximum;
      } else {
        merchandiseSubtotal -= merchandiseSubtotal * voucher.discountOff;
      }
    }

    await request.post(
      PAYPAL_API + "/v1/payments/payment/" + paymentID + "/execute",
      {
        auth: {
          user: clientIdPaypal,
          pass: clientSecretPaypal,
        },
        body: {
          payer_id: payerID,
          transactions: [
            {
              amount: {
                total: parseFloat(convertVNDToUSD(merchandiseSubtotal))
                  .toFixed(2)
                  .toString(),
                currency: "USD",
              },
            },
          ],
        },
        json: true,
      },
      async function (err, response) {
        if (err) {
          console.error(err);
          throw createHttpError(500, "Paypal server error");
        }
        try {
          await createNewOrderCourse(req);

          // remove cart items
          let cartItemIds = order.items.map((i) => i._id);
          const cartItems = await CartItem.deleteMany({
            _id: {
              $in: cartItemIds,
            },
          });
          if (!cartItems) {
            throw createHttpError(404, "Not found food in the cart(s)");
          }

          res.status(200).json({
            msg: "Payment by paypal successfully!",
            status: 200,
          });
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

// admin employee side
const getAllOrders = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage, statusId } =
      req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "createAt";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfOrders;
    let orders;
    if (searchText) {
      if (statusId != 0) {
        let regex = new RegExp([searchText].join(""), "i");
        orders = await Order.find({
          paymentMethod: { $regex: regex },
          statusId,
          orderType: 1,
        })
          .skip(start)
          .limit(numOfPerPage)
          .sort(orderQuery);
        totalNumOfOrders = await Order.find({
          paymentMethod: { $regex: regex },
          statusId,
          orderType: 1,
        }).count();
      } else {
        let regex = new RegExp([searchText].join(""), "i");
        orders = await Order.find({
          paymentMethod: { $regex: regex },
          orderType: 1,
        })
          .skip(start)
          .limit(numOfPerPage)
          .sort(orderQuery);
        totalNumOfOrders = await Order.find({
          paymentMethod: { $regex: regex },
          orderType: 1,
        }).count();
      }
    } else {
      if (statusId != 0) {
        orders = await Order.find({ statusId, orderType: 1 })
          .skip(start)
          .limit(numOfPerPage)
          .sort(orderQuery);
        totalNumOfOrders = await Order.find({
          statusId,
          orderType: 1,
        }).count();
      } else {
        orders = await Order.find({ orderType: 1 })
          .skip(start)
          .limit(numOfPerPage)
          .sort(orderQuery);
        totalNumOfOrders = await Order.find({ orderType: 1 }).count();
      }
    }

    for (let idx = 0; idx < orders.length; idx++) {
      let order = orders[idx];
      let itemsData = await Promise.all(
        order.items.map((i) => Food.findById(i.itemId))
      );
      itemsData = itemsData.map((x, indexX) => ({
        ...order.items[indexX]._doc,
        ...x._doc,
      }));
      const voucher = await Voucher.findById(orders[idx].voucherId);
      orders[idx] = { ...orders[idx]._doc, items: itemsData, voucher };
    }

    let employeesData = orders.map((item) =>
      UserDetail.findOne({ userId: item.employeeId })
    );

    employeesData = await Promise.all(employeesData);
    let customersData = orders.map((item) =>
      UserDetail.findOne({ userId: item.customerId })
    );
    customersData = await Promise.all(customersData);

    orders = orders.map((item, index) => ({
      ...item,
      employee: employeesData[index]
        ? {
            ...employeesData[index]._doc,
            _id: employeesData[index].userId,
          }
        : {},
      customer: {
        ...customersData[index]._doc,
        _id: customersData[index].userId,
      },
    }));
    const totalPage = parseInt(totalNumOfOrders / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get orders successfully!",
      orders,
      totalPage,
      totalRows: totalNumOfOrders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// employee side
const updateStatusOrder = async (req, res, next) => {
  try {
    const { orderId, statusId, customerId } = req.body;
    const employeeId = req.user._id;

    const employee = await UserDetail.findOne({ userId: employeeId });
    const customer = await UserDetail.findOne({ userId: customerId });

    const existedOrder = await Order.findById(orderId);

    if (!existedOrder) {
      throw createHttpError(404, "Order is not exist!");
    }
    if (statusId === 4) {
      await Order.findByIdAndUpdate(orderId, {
        statusId,
        deliveryAt: new Date(),
        isPaid: true,
        employeeId,
      });
    } else {
      await Order.findByIdAndUpdate(orderId, {
        statusId,
        employeeId,
      });
    }

    const newOrder = await Order.findById(orderId);

    let itemsData = await Promise.all(
      newOrder.items.map((i) => {
        if (newOrder.orderType === 1) {
          return Food.findById(i.itemId);
        } else return Course.findById(i.itemId);
      })
    );
    itemsData = itemsData.map((x, indexX) => ({
      item: x,
      ...newOrder.items[indexX],
    }));
    newOrder.items = itemsData;

    res.status(200).json({
      status: 200,
      msg: "Update order successfully!",
      order: { ...newOrder._doc, employee, customer },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkExistMyCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const customer = await UserDetail.findOne({ userId: req.user._id });
    const myCourseIds = customer.courseList.map((item) => item._id.toString());
    if (myCourseIds.includes(courseId)) {
      throw createHttpError(400, "Bạn đã mua khóa học này!");
    }

    let cartItems = await CartItem.find({ customerId: req.user._id });
    const coursesIds = cartItems.map((item) => item.itemId.toString());
    if (coursesIds.includes(courseId)) {
      throw createHttpError(400, "Đã có khóa học này trong giỏ hàng!");
    }

    res.status(200).json({
      status: 200,
      msg: "Check courses successfully!",
      isExist: false,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// client side
const getOrdersByClientId = async (req, res, next) => {
  try {
    let { page, searchText, numOfPerPage, statusId } = req.query;
    const customerId = req.user._id;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";

    const start = (page - 1) * numOfPerPage;
    let totalNumOfOrders;
    let orders;
    if (searchText) {
      if (statusId == 0) {
        let regex = new RegExp([searchText].join(""), "i");
        orders = await Order.find({
          paymentMethod: { $regex: regex },
          customerId,
          orderType: 1,
        })
          .skip(start)
          .limit(numOfPerPage);
        totalNumOfOrders = await Order.find({
          paymentMethod: { $regex: regex },
          customerId,
          orderType: 1,
        }).count();
      } else {
        let regex = new RegExp([searchText].join(""), "i");
        orders = await Order.find({
          paymentMethod: { $regex: regex },
          statusId,
          customerId,
          orderType: 1,
        })
          .skip(start)
          .limit(numOfPerPage);
        totalNumOfOrders = await Order.find({
          paymentMethod: { $regex: regex },
          statusId,
          customerId,
          orderType: 1,
        }).count();
      }
    } else {
      if (statusId == 0) {
        orders = await Order.find({ customerId, orderType: 1 })
          .skip(start)
          .limit(numOfPerPage);
        totalNumOfOrders = await Order.find({
          customerId,
          orderType: 1,
        }).count();
      } else {
        orders = await Order.find({ statusId, customerId, orderType: 1 })
          .skip(start)
          .limit(numOfPerPage);
        totalNumOfOrders = await Order.find({
          statusId,
          customerId,
          orderType: 1,
        }).count();
      }
    }

    for (let idx = 0; idx < orders.length; idx++) {
      let order = orders[idx];
      let itemsData = await Promise.all(
        order.items.map((i) => Food.findById(i.itemId))
      );
      itemsData = itemsData.map((x, indexX) => ({
        ...order.items[indexX]._doc,
        ...x._doc,
      }));
      const voucher = await Voucher.findById(orders[idx].voucherId);
      orders[idx] = { ...orders[idx]._doc, items: itemsData, voucher };
    }

    let employeesData = orders.map((item) =>
      UserDetail.findOne({ userId: item.employeeId })
    );
    employeesData = await Promise.all(employeesData);

    let customersData = orders.map((item) =>
      UserDetail.findOne({ userId: item.customerId })
    );
    customersData = await Promise.all(customersData);

    orders = orders.map((item, index) => ({
      ...item,
      employee: employeesData[index]
        ? {
            ...employeesData[index]._doc,
            _id: employeesData[index].userId,
          }
        : {},
      customer: {
        ...customersData[index]._doc,
        _id: customersData[index].userId,
      },
    }));
    const totalPage = parseInt(totalNumOfOrders / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get orders successfully!",
      orders,
      totalPage,
      totalRows: totalNumOfOrders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// employee, admin

export const orderController = {
  paypalPayment,
  paymentRedirectMoney,
  paypalPaymentCourse,
  updateStatusOrder,
  getOrdersByClientId,
  getAllOrders,
  checkExistMyCourse,
};
