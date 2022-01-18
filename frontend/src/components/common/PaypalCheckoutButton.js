import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import useNotification from "hooks/useNotification";

const PaypalCheckoutButton = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (order) => {
    // call backend function to fulfill order
    // send input to backend to execute payment
    //  if response is success
    console.log("paymentID: ", order.id);
    console.log("payerID: ", order.payer.payer_id);
    setPaidFor(true);
    // refresh user'account or subscription status
    // if the response is error
    // show useNotification()
  };
  useEffect(() => {
    if (!paidFor) return;
    console.log("Thank you");
    // show success modal co time quay quay 1s 2s -> success-> redirect my order page
    // show modal with time and message: Thank you for your purchase!
  }, [paidFor]);

  return (
    <PayPalButtons
      style={{ shape: "pill" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log({ order });
        handleApprove(order);
      }}
      onClick={(data, actions) => {
        console.log({ data });
        // validate button click , client or serve side
        const hasAlreadyBoughtItems = false;
        if (hasAlreadyBoughtItems) {
          // show notification error
          return actions.reject();
        } else {
          return actions.resolve();
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
