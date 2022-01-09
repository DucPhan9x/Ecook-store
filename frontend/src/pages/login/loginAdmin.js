import React from "react";
import { FormAdmin } from "components/login";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const LogInAdmin = () => {
  const history = useHistory();

  const handleLogin = (formData) => {
    console.log(formData);
    // call API login
    Cookies.set("accessToken", "aaaaa");
    history.push("/admin/dashboard");
  };

  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
