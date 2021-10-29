import React from "react";
import { Form } from "components/resetPassword";

const ResetPasswordAdmin = () => {
  const handleResetPassword = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleResetPassword} />;
};

export default ResetPasswordAdmin;
