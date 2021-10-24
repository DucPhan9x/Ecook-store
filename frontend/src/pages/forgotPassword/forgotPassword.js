import React from "react";
import { Form } from "components/forgotPassword";

const ForgotPassword = () => {
  const handleForgotPassword = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleForgotPassword} />;
};

export default ForgotPassword;
