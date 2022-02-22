export const calculateItemPrice = (
  unitPrice,
  quantity,
  discountOff,
  discountMaximum
) => {
  let realPrice = unitPrice * quantity;
  let promotePrice = 0;
  if (discountOff) {
    promotePrice = discountOff * realPrice;
    promotePrice =
      promotePrice > discountMaximum ? discountMaximum : promotePrice;
  }
  return realPrice - promotePrice;
};

export const calculateTotalPrice = (
  total,
  discountOff,
  discountMaximum,
  shipmentFee
) => {
  let realPrice = total;
  let promotePrice = 0;
  if (discountOff) {
    promotePrice = discountOff * realPrice;
    promotePrice =
      promotePrice > discountMaximum ? discountMaximum : promotePrice;
  }
  return realPrice - promotePrice + shipmentFee;
};

export const convertVNDToUSD = (VNDMoney) => {
  return VNDMoney * 0.000044;
};
