export const getPriceItem = (
  discountOff,
  unitPrice,
  discountMaximum,
  quantity = 1
) => {
  return (
    quantity *
    (unitPrice -
      (unitPrice * (discountOff / 100) > discountMaximum
        ? discountMaximum
        : unitPrice * (discountOff / 100)))
  )?.toLocaleString("vi-VI", { style: "currency", currency: "VND" });
};

export const getPriceItemNumber = (
  discountOff,
  unitPrice,
  discountMaximum,
  quantity = 1
) => {
  return (
    quantity *
    (unitPrice -
      (unitPrice * (discountOff / 100) > discountMaximum
        ? discountMaximum
        : unitPrice * (discountOff / 100)))
  );
};

export const formatCurrency = (number) =>
  number?.toLocaleString("vi-VI", { style: "currency", currency: "VND" });

export const convertVNDToUSD = (VNDMoney) => {
  return VNDMoney * 0.000044;
};
