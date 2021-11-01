import React from "react";
import { FormAdmin } from "components/login";

const LogInAdmin = () => {
  const handleLogin = (formData) => {
    console.log(formData);
    // call API login
  };

  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
