import React from "react";
import { FormGroup as ReFormGroup, FormFeedback, Input } from "reactstrap";
import styled from "styled-components";

const StyledFormFeedback = styled(FormFeedback)`
  && {
    padding: 0 16px;
    display: ${({ error }) => (error ? "block" : "none")};
    font-size: 12px;
  }
`;

const StyledFormBox = styled(ReFormGroup)`
  &&& {
    .react-select__control,
    .react-single-select__control {
      ${({ error }) => (error ? "border-color: #dc3545 !important;" : "")}
    }
  }
`;

function FormBox({
  propsFormBox = {},
  propsInput = {},
  error = "",
  showErrorMessage = true,
  variant = "Input",
  type = "",
  className = "",
  label = "",
}) {
  return (
    <StyledFormBox error={error} {...propsFormBox} className="form-box">
      {variant === "Input" && <Input invalid={!!error} {...propsInput} />}
      {variant === "InputLabel" && (
        <>
          <label>{label}</label>
          <Input invalid={!!error} {...propsInput} />
        </>
      )}
      {type === "checkbox" && <span className="checkmark" />}
      {showErrorMessage && (
        <StyledFormFeedback error={error}>{error}</StyledFormFeedback>
      )}
    </StyledFormBox>
  );
}

export default FormBox;
