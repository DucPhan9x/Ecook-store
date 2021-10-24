import React from "react";
import { Form } from "components/register";

const Register = () => {
  const handleRegister = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleRegister} />;
};

export default Register;
