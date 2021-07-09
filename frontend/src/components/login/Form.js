import React, { useEffect } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isEmail } from "validator";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { ROUTE_FORGOTPASSWORD, ROUTE_REGISTER } from "utils/routes";
import SpinLoading from "components/common/SpinLoading";

const Form = ({ handleSubmit }) => {
  const [error, setError] = React.useState({});
  const history = useHistory();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = React.useState();
  const storeLogin = useSelector((store) => store.login);
  const loading = storeLogin.loading;
  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.email)) {
      errorState.email = "Please enter email";
    } else {
      if (!isEmail(form.email)) {
        errorState.email = "Email not valid";
      }
    }
    if (isEmpty(form.password)) {
      errorState.password = "Please enter password";
    }
    return errorState;
  };

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
    setErrorLogin("");
  };

  return (
    <section onSubmit={handleSubmitForm} className="login">
      {loading && <SpinLoading />}
      <i class="fab fa-facebook-square"></i>
      <div className="">
        <ReForm className="">
          <div className="">
            <p>Login to your account</p>
            <div className="error">{errorLogin}</div>
          </div>

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
              placeholder: "Password",
              onChange: handleChange,
              onFocus: handleFocus,
              value: form.password,
              disabled: false,
            }}
            error={error.password}
          />
          <button disabled={loading} className="">
            Login
          </button>
          <div className="">
            <div>
              <Link to={ROUTE_FORGOTPASSWORD} className="">
                Forgot Password?
              </Link>
            </div>
            <div>
              <Link to={ROUTE_REGISTER} className="">
                Register
              </Link>
            </div>
          </div>
        </ReForm>
      </div>
    </section>
  );
};

export default Form;
