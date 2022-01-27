import React from "react";
import { Form } from "components/resetPassword";
import { resetPassword } from "redux/actions/auth";
import useNotification from "hooks/useNotification";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const handleResetPassword = (formData) => {
    dispatch(
      resetPassword(formData, (res) => {
        if (res.status === 200) {
          useNotification.Success({
            message: res.msg,
          });
        }
      })
    );
  };

  return <Form handleSubmit={handleResetPassword} />;
};

export default ResetPassword;
