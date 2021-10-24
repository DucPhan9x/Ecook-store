import React from "react";
import { Form } from "components/resetPassword";

const ResetPassword = () => {
  const handleResetPassword = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleResetPassword} />;
};

export default ResetPassword;
