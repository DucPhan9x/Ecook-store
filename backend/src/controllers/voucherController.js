import { Voucher } from "../models/VoucherModel";
import createHttpError from "http-errors";

const createNewVoucher = async (req, res, next) => {
  try {
    const {
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
    } = req.body;

    const newVoucher = await Voucher.create({
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
      slotQuantity,
    });

    res.status(200).json({
      status: 200,
      msg: "Create new voucher successfully!",
      data: newVoucher,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateVoucherById = async (req, res, next) => {
  try {
    const {
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
    } = req.body;
    const voucherId = req.params.voucherId;
    const existedVoucher = await Voucher.findById(voucherId);

    if (!existedVoucher) {
      throw createHttpError(404, "Voucher is not exist!");
    }
    const newVoucher = await Voucher.findByIdAndUpdate(recipeId, {
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
    });

    res.status(200).json({
      status: 200,
      msg: "Update voucher successfully!",
      voucher: newVoucher,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteVoucherById = async (req, res, next) => {
  try {
    const voucherId = req.params.voucherId;
    const existedVoucher = await Voucher.findById(voucherId);

    if (!existedVoucher) {
      throw createHttpError(404, "Voucher is not exist!");
    }
    Voucher.findByIdAndRemove(voucherId),
      res.status(200).json({
        status: 200,
        msg: "Delete voucher successfully!",
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListVoucherPerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    const start = (page - 1) * numOfPerPage;
    let totalNumOfVouchers;
    let vouchers;
    if (searchText) {
      vouchers = await Voucher.find({
        $text: { $search: searchText },
        isRemoved: true,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfVouchers = await Recipe.find({
        $text: { $search: searchText },
        isRemoved: true,
      }).count();
    } else {
      vouchers = await Recipe.find({ isRemoved: true })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfVouchers = await Voucher.find({ isRemoved: true }).count();
    }
    const totalPage = parseInt(totalNumOfVouchers / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get vouchers successfully!",
      vouchers,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getVoucherById = async (req, res, next) => {
  try {
    const voucherId = req.params.voucherId;
    const voucher = await Voucher.findById(voucherId);

    res.status(200).json({
      status: 200,
      msg: "Get voucher successfully!",
      voucher,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const voucherController = {
  createNewVoucher,
  updateVoucherById,
  deleteVoucherById,
  getListVoucherPerPage,
  getVoucherById,
};
