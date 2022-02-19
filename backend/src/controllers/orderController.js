import request from "request";
import { envVariables } from "../configs";
import createHttpError from "http-errors";
import { Food, Voucher, Order } from "../models";
import { calculateItemPrice, calculateTotalPrice } from "../utils";
import Mongoose from "mongoose";

const { PAYPAL_API, clientIdPaypal, clientSecretPaypal } = envVariables;

const paypalPayment = async (req, res, next) => {
  try {
    const paymentID = req.body.paymentID;
    const payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    const response = await request.post(
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
                total: "10.99",
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
        // 4. Return a success response to the client
        try {
          await createNewOrder(req);
          res.status(200).json({
            msg: "Payment by paypal successfully!",
            status: 200,
          });
        } catch (error) {
          next(error);
        }
      }
    );
    // console.log(response);
  } catch (error) {
    next(error);
  }
};

// customerId, address, isPaid, paymentMethod == "direct" "paypal", shipment - TBD, merchandiseSubtotal  - calculate, items, voucherId
// missing shipmentFee
const createNewOrder = async (req) => {
  try {
    const { address, items, voucherId, shipmentFee } = req.body.order;
    console.log(items);
    const foods = await Promise.all(
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
            foods[currentIndex] ? foods[currentIndex].discountOff : 0,
            foods[currentIndex] ? foods[currentIndex].discountMaximum : 0
          )
        );
      },
      0
    );

    // update voucher
    let data = {
      address,
      customerId: req.user._id,
      isPaid: true,
      paymentMethod: "paypal",
      merchandiseSubtotal,
      shipmentFee,
      items: orderItems,
      statusId: 1,
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

const paymentRedirectMoney = (re1, res, next) => {
  // create payment code
  // payment method redirect
};
const paypalPaymentCourse = (req, res, next) => {
  // same paypalPayment food
};

const getOrdersByClientId = (req, res, next) => {};
const getAllOrders = (req, res, next) => {};
const updateStatusOrder = (req, res, next) => {};
const customerFinishOrder = (req, res, next) => {};

export const orderController = {
  paypalPayment,
  paymentRedirectMoney,
  paypalPaymentCourse,
  updateStatusOrder,
  customerFinishOrder,
  getOrdersByClientId,
  getAllOrders,
};
