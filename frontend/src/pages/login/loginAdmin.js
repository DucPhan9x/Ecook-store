import React from "react";
import { FormAdmin } from "components/login";

const LogInAdmin = () => {
  const handleLogin = (formData) => {
    console.log(formData);
  };

  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
