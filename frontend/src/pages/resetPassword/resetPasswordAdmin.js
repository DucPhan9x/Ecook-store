import React from "react";
import FormResetPassAdmin from "components/resetPassword/FormAdmin";
import { resetPasswordAdmin } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import useNotification from "hooks/useNotification";

const ResetPasswordAdmin = () => {
  const dispatch = useDispatch();
  const handleResetPassword = (formData) => {
    dispatch(
      resetPasswordAdmin(formData, (res) => {
        if (res.status === 200) {
          useNotification.Success({
            message: res.msg,
          });
        }
      })
    );
  };

  return <FormResetPassAdmin handleSubmit={handleResetPassword} />;
};

export default ResetPasswordAdmin;
