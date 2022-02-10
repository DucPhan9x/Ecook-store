import React from "react";
import { Form } from "components/login";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/actions/auth";
import { setRefreshToken, setToken, setUserDetail } from "redux/actions/common";

const LogIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    dispatch(
      login(formData, (res) => {
        if (res) {
          history.push("/");
          dispatch(setToken(res?.token));
          dispatch(setRefreshToken(res?.refreshToken));
          dispatch(setUserDetail(res));
        }
      })
    );
  };

  return <Form handleSubmit={handleLogin} />;
};

export default LogIn;
