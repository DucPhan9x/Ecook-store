import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SpinLoading from "components/common/SpinLoading";

const FormCreationNewAccountAdmin = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  const [form, setForm] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const storeRegister = useSelector((store) => store.createNewAdminAccount);
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
    document.title = "Tạo tài khoản admin | ECook";
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
      fullName: form.userName.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
    handleSubmit(formData);
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
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
        <div className="login-header--item active">Tạo tài khoản</div>
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
            Tạo
          </button>
        </ReForm>
      </div>
    </section>
  );
};

export default FormCreationNewAccountAdmin;
