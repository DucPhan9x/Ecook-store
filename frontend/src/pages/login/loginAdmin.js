import React from "react";
import { FormAdmin } from "components/login";
import { useHistory } from "react-router-dom";
import { loginAdmin } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import { setRefreshTokenAdmin, setTokenAdmin } from "redux/actions/common";
import { setUserDetailAdmin } from "redux/actions/admin";

const LogInAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    dispatch(
      loginAdmin(formData, (res) => {
        if (res) {
          history.push("/admin/dashboard");
          dispatch(setUserDetailAdmin(res.user));
          dispatch(setTokenAdmin(res?.user?.token));
          dispatch(setRefreshTokenAdmin(res?.user?.refreshToken));
        }
      })
    );
  };
  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
