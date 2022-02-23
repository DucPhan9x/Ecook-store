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
      voucher: newVoucher,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateVoucherById = async (req, res, next) => {
  try {
    const {
      voucherId,
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
    } = req.body;
    const existedVoucher = await Voucher.findById(voucherId);

    if (!existedVoucher) {
      throw createHttpError(404, "Voucher is not exist!");
    }
    await Voucher.findByIdAndUpdate(voucherId, {
      name,
      discountOff,
      maxDiscountOff,
      content,
      minOrder,
      remainingSlot,
      expiredDate,
    });
    const newVoucher = Voucher.findById(voucherId);

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
    const voucherIds = req.body;
    for (let i = 0; i < voucherIds.length; i++) {
      const voucherId = voucherIds[i];
      const voucher = await Promise.all([
        Voucher.findByIdAndUpdate(voucherId, {
          isRemoved: true,
        }),
      ]);
      if (!voucher) {
        throw createHttpError(400, "Voucher is not exist!");
      }
    }

    res.status(200).json({
      status: 200,
      msg: "Delete voucher(s) successfully!",
      voucherIds,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListVoucherPerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "name";
    orderType = orderType === "asc" ? 1 : 0;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfVouchers;
    let vouchers;
    if (searchText) {
      let regex = new RegExp([searchText].join(""), "i");
      vouchers = await Voucher.find({
        name: { $regex: regex },
        isRemoved: false,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfVouchers = await Voucher.find({
        name: { $regex: regex },
        isRemoved: false,
      }).count();
    } else {
      vouchers = await Voucher.find({ isRemoved: false })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfVouchers = await Voucher.find({ isRemoved: false }).count();
    }
    const totalRows = await Voucher.find({ isRemoved: false }).count();
    const totalPage = parseInt(totalNumOfVouchers / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get vouchers successfully!",
      vouchers,
      totalPage,
      totalRows,
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