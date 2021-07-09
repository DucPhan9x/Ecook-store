import React from "react";
import { Form } from "components/login";

const LogIn = () => {
  const handleLogin = (formData) => {
    console.log(formData);
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
