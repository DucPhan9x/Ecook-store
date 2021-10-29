import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SpinLoading from "components/common/SpinLoading";
import { ROUTE_FORGOT_PASSWORD_ADMIN } from "utils/routes";

const FormAdmin = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  useEffect(() => {
    document.title = "Đăng nhập | ECook";
  }, []);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const storeLogin = useSelector((store) => store.login);
  const loading = storeLogin.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.email)) {
      errorState.email = "Vui lòng nhập vào, không được để trống!";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email không hợp lệ!";
      }
    }
    if (isEmpty(form.password)) {
      errorState.password = "Vui lòng nhập vào, không được để trống!";
    }
    return errorState;
  };

  useEffect(() => {
    if (!(history.location.state && history.location.state.email)) return;
    setForm({
      ...form,
      email: history.location.state.email || "",
      password: "",
    });
    setError({ ...error, email: "", password: "" });
    // eslint-disable-next-line
  }, [history]);
  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    const formData = {
      email: form.email,
      password: form.password,
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      {loading && <SpinLoading />}
      <div className="login-header">
        <div
          className={`login-header--item ${
            window.location.pathname.endsWith("/login") ? "active" : ""
          }`}
        >
          Quản trị viên
        </div>
      </div>
      <div className="login-body">
        <ReForm className="form--login">
          <FormBox
            propsInput={{
              name: "email",
              placeholder: "Email",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.email,
              disabled: false,
            }}
            error={error.email}
          />

          <FormBox
            propsInput={{
              type: "password",
              name: "password",
              placeholder: "Mật khẩu",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <button disabled={loading} className="btn--login">
            Đăng nhập
          </button>
        </ReForm>
      </div>
      <div className="login-footer">
        <span onClick={() => history.push(ROUTE_FORGOT_PASSWORD_ADMIN)}>
          Quên mật khẩu?
        </span>
      </div>
    </section>
  );
};

export default FormAdmin;
