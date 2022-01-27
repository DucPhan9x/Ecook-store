const nodemailer = require("nodemailer");
import createHttpError from "http-errors";
import { ResetCode } from "../models";

const ramdomCode = require("randomatic");
export const getPaymentCode = async (orderId, next) => {
  try {
    do {
      const code = ramdomCode("0aA", 8);
      const exist = await PaymentCode.findOne({ code });
      if (!exist) {
        PaymentCode.create({
          code,
          orderId,
        });
        return code;
      }
    } while (true);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getResetCode = async (userId, next) => {
  try {
    do {
      const code = ramdomCode("0aA", 8);
      const exist = await ResetCode.findOne({ code });
      if (!exist) {
        const expiredCode = await ResetCode.findOne({ userId });
        if (expiredCode) {
          await ResetCode.findOneAndUpdate(
            { userId },
            {
              expired: true,
            }
          );
        }
        ResetCode.create({
          code,
          userId,
        });
        return code;
      }
    } while (true);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const confirmResetCode = async (code, userId, next) => {
  try {
    const confirmCode = await ResetCode.findOne({
      code,
      userId,
      expired: false,
    });
    console.log({ confirmCode });
    if (!confirmCode) return false;
    await ResetCode.findOneAndUpdate(
      { code },
      {
        expired: true,
      }
    );
    const duration = Date.now() - new Date(confirmCode.createAt).getTime();
    if (duration > 3 * 60 * 60 * 1000) {
      throw createHttpError(400, "Code expired!");
    }
    return true;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
