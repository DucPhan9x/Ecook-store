import React from "react";
import { FormAdmin } from "components/login";
import { useHistory } from "react-router-dom";
import { loginAdmin } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import { setAvatarURLAdmin, setTokenAdmin } from "redux/actions/common";

const LogInAdmin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = (formData) => {
    dispatch(
      loginAdmin(formData, (res) => {
        if (res) {
          history.push("/admin/dashboard");
          dispatch(setTokenAdmin(res?.token));
          dispatch(setAvatarURLAdmin(res?.imageUrl));
        }
      })
    );
  };
  return <FormAdmin handleSubmit={handleLogin} />;
};

export default LogInAdmin;
