import React from "react";
import { Form } from "components/forgotPassword";

const ForgotPasswordAdmin = () => {
  const handleForgotPassword = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleForgotPassword} />;
};

export default ForgotPasswordAdmin;
