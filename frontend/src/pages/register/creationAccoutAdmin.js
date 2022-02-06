import React from "react";
import { FormCreationNewAccountAdmin } from "components/login";
import { useDispatch } from "react-redux";
import { createNewAdminAccount } from "redux/actions/auth";

const CreationAccountAdmin = () => {
  const dispatch = useDispatch();

  const handleCreateNewAccount = (formData) => {
    dispatch(createNewAdminAccount(formData));
  };

  return <FormCreationNewAccountAdmin handleSubmit={handleCreateNewAccount} />;
};

export default CreationAccountAdmin;
