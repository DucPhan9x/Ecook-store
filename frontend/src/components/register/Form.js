import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import SpinLoading from "components/common/SpinLoading";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  const [form, setForm] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const storeRegister = useSelector((store) => store.register);
  const loading = storeRegister.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.userName)) {
      errorState.userName = "Vui lòng nhập vào, không được để trống!";
    }
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
    document.title = "Đăng ký | ECook";
  }, []);

  useEffect(() => {
    if (!(history.location.state && history.location.state.email)) return;
    setForm({ ...form, email: history.location.state.email });
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
      userName: form.userName,
      email: form.email,
      password: form.password,
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
    <section onSubmit={handleSubmitForm} className="login">
      {loading && <SpinLoading />}
      <div className="login-header">
        <div
          className={`login-header--item ${
            window.location.pathname.endsWith("/login") ? "active" : ""
          }`}
          onClick={() => history.push("/login")}
        >
          Đăng nhập
        </div>
        <div
          className={`login-header--item ${
            window.location.pathname.endsWith("/register") ? "active" : ""
          }`}
        >
          Đăng ký
        </div>
      </div>
      <div className="login-body">
        <ReForm className="form--login">
          <FormBox
            propsInput={{
              name: "userName",
              placeholder: "Tên",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.userName,
              disabled: false,
            }}
            error={error.userName}
          />

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
            Đăng ký
          </button>
        </ReForm>
      </div>
      <div className="login-footer">
        <span style={{ color: "gray", cursor: "unset" }}>
          Đăng ký thành viên như là đã đồng ý các
          <Link className="privacy-text" to="/privacy">
            {" "}
            điều khoản sử dụng{" "}
          </Link>
          tại ECook
        </span>
      </div>
    </section>
  );
};

export default Form;
