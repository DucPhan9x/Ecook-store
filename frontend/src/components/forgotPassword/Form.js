import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SpinLoading from "components/common/SpinLoading";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();

  useEffect(() => {
    document.title = "Quên mật khẩu | ECook";
  }, []);

  const [form, setForm] = React.useState({
    email: "",
  });
  const storeForgotPassword = useSelector((store) => store.forgotPassword);
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

  return (
    <section onSubmit={handleSubmitForm} className="login">
      <div className="login-header">
        <span>Quên mật khẩu</span>
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
          <button className="btn--login" disabled={loading}>
            Xác nhận
          </button>
        </ReForm>
      </div>
      {loading && <SpinLoading />}
    </section>
  );
};

export default Form;
