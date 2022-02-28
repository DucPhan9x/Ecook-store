import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import useNotification from "hooks/useNotification";
import { useDispatch } from "react-redux";
import { paypalPayment, paypalPaymentCourse } from "redux/actions/order";
import { convertVNDToUSD } from "utils/priceUtils";

const PaypalCheckoutButton = (props) => {
  const dispatch = useDispatch();
  const { requestData, type, closeCartModal } = props;

  return (
    <PayPalButtons
      style={{ shape: "pill" }}
      createOrder={async (data, actions) => {
        let merchandiseSubtotal =
          requestData.items.reduce((f, s) => f + s.quantity * s.unitPrice, 0) +
          (requestData.shipmentFee || 0);

        if (requestData.voucherId) {
          const voucher = requestData.voucherData;
          if (
            merchandiseSubtotal * voucher.discountOff >
            voucher.discountMaximum
          ) {
            merchandiseSubtotal -= voucher.discountMaximum;
          } else {
            merchandiseSubtotal -= merchandiseSubtotal * voucher.discountOff;
          }
        }

        return actions.order.create({
          purchase_units: [
            {
              description: "This is the payment description.",
              amount: {
                value: parseFloat(convertVNDToUSD(merchandiseSubtotal))
                  .toFixed(2)
                  .toString(),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        if (type === "food") {
          dispatch(
            paypalPayment(
              {
                paymentID: order.id,
                payerID: order.payer.payer_id,
                order: requestData,
              },
              (res) => {
                if (res.status === 200) {
                  closeCartModal();
                }
              }
            )
          );
        } else {
          dispatch(
            paypalPaymentCourse(
              {
                paymentID: order.id,
                payerID: order.payer.payer_id,
                order: requestData,
              },
              (res) => {
                if (res.status === 200) {
                  closeCartModal();
                }
              }
            )
          );
        }
      }}
      onCancel={() => {}}
      onError={(err) => {
        useNotification.Error({
          title: "Error",
          message: err,
        });
      }}
    />
  );
};

export default PaypalCheckoutButton;
