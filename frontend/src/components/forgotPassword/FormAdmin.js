import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpinLoading from "components/common/SpinLoading";
import { sendResetCode } from "redux/actions/auth";
import useNotification from "hooks/useNotification";

const FormForgotAdmin = () => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  useEffect(() => {
    document.title = "Quên mật khẩu | ECook";
  }, []);

  const [form, setForm] = React.useState({
    email: "",
  });
  const storeForgotPassword = useSelector((store) => store.forgotPasswordAdmin);
  const loading = storeForgotPassword.loading;

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
    return errorState;
  };
  const dispatch = useDispatch();

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

  const handleSubmit = (formData) => {
    dispatch(
      sendResetCode(formData.email, (res) => {
        if (res.status === 200) {
          useNotification.Success({
            title: "Message",
            message: res?.msg,
          });
        }
      })
    );
  };

  return (
    <section onSubmit={handleSubmitForm} className="login login-admin">
      <div className="login-header">
        <span>Quên mật khẩu</span>
      </div>
      <div className="login-body">
        <ReForm className="form--login">
          <label style={{ fontSize: 14, color: "gray", marginLeft: 10 }}>
            Địa chỉ email
          </label>
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
          <div className="flex items-center" style={{ marginTop: 20 }}>
            <button
              className={`btn--login ${!form.email ? "btn-disabled" : ""}`}
              disabled={loading || !form.email}
              style={{ marginRight: 15 }}
            >
              Gửi code
            </button>
            <button
              className={`btn--login ${!form.email ? "btn-disabled" : ""}`}
              disabled={loading || !form.email}
              onClick={() => {
                history.push("/admin/reset-password", { email: form.email });
              }}
            >
              Reset password
            </button>
          </div>
        </ReForm>
      </div>
      {loading && <SpinLoading />}
    </section>
  );
};

export default FormForgotAdmin;
