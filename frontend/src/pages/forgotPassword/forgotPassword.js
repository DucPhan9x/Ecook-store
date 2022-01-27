import React from "react";
import { Form } from "components/forgotPassword";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendResetCode } from "redux/actions/auth";
import useNotification from "hooks/useNotification";

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleForgotPassword = (formData) => {
    console.log(formData);
    dispatch(
      sendResetCode(formData.email, (res) => {
        if (res.status === 200) {
          useNotification.Success({
            title: "Message",
            message: res?.msg,
          });
          setTimeout(() => {
            history.push("/reset-password", { email: formData.email });
          }, 3100);
        }
      })
    );
  };

  return <Form handleSubmit={handleForgotPassword} />;
};

export default ForgotPassword;
