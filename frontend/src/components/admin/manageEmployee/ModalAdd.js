import React from "react";
import { Modal } from "antd";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isMobilePhone, isEmail } from "validator";
import {
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createEmployee } from "redux/actions/employee";

const ModalAdd = ({ isModalVisible, handleSubmit, close }) => {
  const [error, setError] = React.useState({});

  const [form, setForm] = React.useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    imageUrl: "",
    employeeType: "3",
  });

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.fullName)) {
      errorState.fullName = "Không được để trống!";
    }
    if (!isMobilePhone(form.phoneNumber)) {
      errorState.phoneNumber = "Thông tin nhập vào không hợp lệ!";
    }
    if (!isEmail(form.email)) {
      errorState.email = "Thông tin nhập vào không hợp lệ!";
    }
    if (isEmpty(form.address)) {
      errorState.address = "Không được để trống!";
    }
    if (isEmpty(form.password)) {
      errorState.password = "Không được để trống!";
    }

    return errorState;
  };
  const dispatch = useDispatch();

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    handleSubmit(form);
    dispatch(createEmployee(form));
    console.log(form);
    close();
    handleReset();
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

  const handleReset = () => {
    setForm({
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      address: "",
      imageUrl: "",
      employeeType: "3",
    });
    setError({});
  };

  const handleChangeFilterEmployeeType = (event) => {
    setForm({ ...form, employeeType: event.target.value });
  };

  console.log(form);

  return (
    <Modal
      className="modal-container"
      title="Tạo tài khoản nhân viên"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      onCancel={() => {
        close();
        handleReset();
      }}
    >
      <ReForm className="flex">
        <Paper
          className="add-edit-recipe-container-bottom--left"
          style={{ width: "0%", height: 200 }}
        >
          {/* <img src={form?.imageUrl || NoImage} alt="avatar" />
          <UploadImage onChangeImage={handleChangeImage} /> */}
        </Paper>
        <div style={{ width: "100%" }}>
          <div className="field-input-information-employee">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="role"
                name="role"
                value={form.employeeType}
                onChange={handleChangeFilterEmployeeType}
                className="flex flex-row"
              >
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Nhân viên"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Giáo viên"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="field-input-information-employee">
            <label>Họ & tên</label>
            <FormBox
              propsInput={{
                name: "fullName",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.fullName,
                disabled: false,
              }}
              error={error.fullName}
            />
          </div>
          <div className="field-input-information-employee">
            <label>Email</label>
            <FormBox
              propsInput={{
                name: "email",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.email,
                disabled: false,
              }}
              error={error.email}
            />
          </div>
          <div className="field-input-information-employee">
            <label>Số điện thoại</label>
            <FormBox
              propsInput={{
                name: "phoneNumber",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.phoneNumber,
                disabled: false,
              }}
              error={error.phoneNumber}
            />
          </div>
          <div className="field-input-information-employee">
            <label>Địa chỉ liên hệ</label>
            <FormBox
              propsInput={{
                name: "address",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.address,
                disabled: false,
              }}
              error={error.address}
            />
          </div>
          <div className="field-input-information-employee">
            <label>Password</label>
            <FormBox
              propsInput={{
                name: "password",
                type: "password",
                placeholder: "*****************",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.password,
                disabled: false,
              }}
              error={error.password}
            />
          </div>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalAdd;
