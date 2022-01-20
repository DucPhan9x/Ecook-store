import React from "react";
import { Form } from "components/register";
import { useDispatch } from "react-redux";
import { register } from "redux/actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const handleRegister = (formData) => {
    dispatch(register(formData));
  };

  return <Form handleSubmit={handleRegister} />;
};

export default Register;
