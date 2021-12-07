import React, { useEffect } from "react";
import { Modal } from "antd";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isMobilePhone, isEmail } from "validator";
import UploadImage from "components/common/UploadImage";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { Paper } from "@material-ui/core";

const ModalEdit = ({ isModalVisible, handleSubmit, close, selectedItem }) => {
  const [error, setError] = React.useState({});

  const [form, setForm] = React.useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    address: "",
    imageUrl: "",
  });

  useEffect(() => {
    setForm(selectedItem);
  }, [selectedItem]);

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
    return errorState;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log({ form });

    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    handleSubmit(form);
    close();
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
    });
    setError({});
  };

  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setForm({ ...form, imageUrl: temp });
  };

  return (
    <Modal
      className="modal-container"
      title="Thông tin tài khoản nhân viên"
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
          style={{ width: "40%", height: 200 }}
        >
          {form?.imageUrl ? (
            <img src={form?.imageUrl} alt="avatar" />
          ) : (
            <WallpaperIcon
              style={{ width: "70%", height: "70%" }}
              color="action"
            />
          )}
          <UploadImage onChangeImage={handleChangeImage} />
        </Paper>
        <div style={{ width: "60%" }}>
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
                disabled: true,
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
          {/* <div className="field-input-information-employee">
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
          </div> */}
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalEdit;