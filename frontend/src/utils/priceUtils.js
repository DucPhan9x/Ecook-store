export const getPriceItem = (discountOff, unitPrice, discountMaximum) => {
  return (
    unitPrice -
    (unitPrice * (discountOff / 100) > discountMaximum
      ? discountMaximum
      : unitPrice * (discountOff / 100))
  );
};
export const formatCurrency = (number) =>
  number?.toLocaleString("vi-VI", { style: "currency", currency: "VND" });
