import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SpinLoading from "components/common/SpinLoading";

const FormResetPassAdmin = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  const [form, setForm] = React.useState({
    code: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const storeResetPassword = useSelector((store) => store.resetPasswordAdmin);
  const loading = storeResetPassword.loading;
  const validate = () => {
    const errorState = {};
    // check validate

    if (isEmpty(form.code)) {
      errorState.code = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(form.confirmPassword)) {
      errorState.confirmPassword = "Vui lòng nhập vào, không được để trống!";
    } else {
      if (form.password !== form.confirmPassword) {
        errorState.confirmPassword = "Mật khẩu xác nhận không khớp!";
      }
    }
    return errorState;
  };

  useEffect(() => {
    document.title = "Reset mật khẩu | ECook";
  }, []);

  useEffect(() => {
    if (!(history.location.state && history.location.state.email)) return;
    setForm({ ...form, email: history.location.state.email || "" });
    setError({ ...error, email: "" });
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
      code: form.code,
      newPassword: form.password,
      confirmPassword: form.confirmPassword,
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
    <section onSubmit={handleSubmitForm} className="login login-admin">
      {loading && <SpinLoading />}
      <div className="login-header">
        <span>Reset mật khẩu</span>
      </div>
      <div className="login-body">
        <ReForm className="form--login">
          <div
            className="btn btn-disabled full-width"
            style={{ color: "whitesmoke" }}
          >
            {form.email}
          </div>
          <FormBox
            propsInput={{
              name: "code",
              placeholder: "Mã xác thực",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.code,
              disabled: false,
            }}
            error={error.code}
          />

          <FormBox
            propsInput={{
              type: "password",
              name: "password",
              placeholder: "Mật khẩu mới",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <FormBox
            propsInput={{
              type: "password",
              name: "confirmPassword",
              placeholder: "Xác nhận mật khẩu",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.confirmPassword,
              disabled: false,
            }}
            error={error.confirmPassword}
          />
          <button disabled={loading} className="btn--login">
            Xác nhận
          </button>
        </ReForm>
        <div className="flex j-space-between full-width">
          <span
            className="center"
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => history.push("/admin/forgot-password")}
          >
            Re-send code now?
          </span>
          <span
            className="center"
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => history.push("/admin/login")}
          >
            Login now?
          </span>
        </div>
      </div>
    </section>
  );
};

export default FormResetPassAdmin;
