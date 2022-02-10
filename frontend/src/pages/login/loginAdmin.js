import React from "react";
import { FormAdmin } from "components/login";
import { useHistory } from "react-router-dom";
import { loginAdmin } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import { setRefreshToken, setToken, setUserDetail } from "redux/actions/common";

const LogInAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    dispatch(
      loginAdmin(formData, (res) => {
        if (res) {
          history.push("/admin/dashboard");
          dispatch(setUserDetail(res.user));
          dispatch(setToken(res?.user?.token));
          dispatch(setRefreshToken(res?.user?.refreshToken));
        }
      })
    );
  };
  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
