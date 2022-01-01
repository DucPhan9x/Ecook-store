import React from "react";
import { Form } from "components/login";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const LogIn = () => {
  const history = useHistory();
  const handleLogin = (formData) => {
    console.log(formData);
    Cookies.set("accessToken", "aaaaa");
    history.push("/");
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
