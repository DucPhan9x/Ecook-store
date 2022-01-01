import { Paper, Radio, Tab, Tabs } from "@material-ui/core";
import UploadImage from "components/common/UploadImage";
import React, { useEffect } from "react";
import { uuid } from "utils/stringUtils";
import NoImage from "assets/images/notImage.png";
import { useState } from "react";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isMobilePhone } from "validator";
import moment from "moment";

const MyProfile = () => {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    document.title = "Hồ sơ cá nhân | ECook";
    window.scrollTo(0, 0);
  }, []);
  const data = {
    _id: uuid(),
    email: "trongduc.iter@gmail.com",
    fullName: "Phan Trong Duc",
    dateOfBirth: Date.now(),
    phoneNumber: "0987867583",
    gender: false,
    address: "62/07 Dong Ke, Hoa Khanh Bac, Lien Chieu, Da Nang",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
  };

  const [formInfo, setFormInfo] = useState({
    fullName: "",
    email: "",
    dateOfBirth: Date.now(),
    phoneNumber: "",
    gender: false,
    address: "",
  });
  const [formPassword, setFormPassword] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [imageAvatar, setImageAVatar] = useState("");

  const [errorInfo, setErrorInfo] = useState({});
  const [errorPassword, setErrorPassword] = useState({});

  useEffect(() => {
    setImageAVatar(data?.imageUrl);
    setFormInfo({
      fullName: data.fullName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      address: data.address,
    });
    // eslint-disable-next-line
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setImageAVatar(temp);
  };

  const handleFocusInfo = (event) => {
    setErrorInfo({
      ...errorInfo,
      [event.target.name]: "",
    });
  };
  const handleFocusPass = (event) => {
    setErrorPassword({
      ...errorPassword,
      [event.target.name]: "",
    });
  };

  const handleChangeInfo = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleChangePass = (event) => {
    setFormPassword({
      ...formPassword,
      [event.target.name]: event.target.value,
    });
  };

  const validateInfo = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formInfo.fullName)) {
      errorState.fullName = "Không được để trống!";
    }
    if (!isMobilePhone(formInfo.phoneNumber)) {
      errorState.phoneNumber = "Không hợp lệ!!";
    }
    return errorState;
  };

  const validatePass = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formPassword.password)) {
      errorState.password = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(formPassword.newPassword)) {
      errorState.newPassword = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(formPassword.confirmNewPassword)) {
      errorState.confirmNewPassword = "Vui lòng nhập vào, không được để trống!";
    } else {
      if (formPassword.newPassword !== formPassword.confirmNewPassword) {
        errorState.confirmNewPassword = "Mật khẩu xác nhận không khớp!";
      }
    }
    return errorState;
  };

  return (
    <div className="my-profile-container">
      <div className="my-profile-container__inner">
        <Paper className="my-profile-container__inner-left">
          <img src={imageAvatar || NoImage} alt="" />
          <UploadImage onChangeImage={handleChangeImage} />
        </Paper>
        <div className="my-profile-container__inner-right flex flex-col">
          <Paper square className="my-profile-container__inner-right--tabs">
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeTab}
              aria-label="disabled tabs example"
            >
              <Tab label="Thông tin cá nhân" />
              <Tab label="Cập nhật password" />
            </Tabs>
          </Paper>
          <Paper className="my-profile-container__inner-right--content">
            <div className="my-profile-container__inner-right--content__inner">
              {!value ? (
                <ReForm style={{ height: 290 }}>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Họ và tên</label>
                    <FormBox
                      propsInput={{
                        name: "fullName",
                        placeholder: "Họ và tên",
                        onChange: handleChangeInfo,
                        onFocus: handleFocusInfo,
                        value: formInfo.fullName,
                        disabled: false,
                      }}
                      error={errorInfo.fullName}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Ngày sinh</label>
                    <FormBox
                      propsInput={{
                        name: "dateOfBirth",
                        type: "date",
                        placeholder: "Ngày sinh",
                        onChange: handleChangeInfo,
                        onFocus: handleFocusInfo,
                        value: moment(formInfo.dateOfBirth).format(
                          "YYYY-MM-DD"
                        ),
                        disabled: false,
                      }}
                      error={errorInfo.dateOfBirth}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Giới tính</label>
                    <div>
                      <div className="flex items-center">
                        <div style={{ width: 50 }}>Nam</div>
                        <Radio
                          checked={!formInfo?.gender}
                          onChange={() =>
                            setFormInfo({ ...formInfo, gender: false })
                          }
                          value="male"
                          name="radio-button-demo"
                        />
                      </div>
                      <div className="flex items-center">
                        <div style={{ width: 50 }}>Nữ</div>
                        <Radio
                          checked={formInfo?.gender}
                          onChange={() =>
                            setFormInfo({ ...formInfo, gender: true })
                          }
                          value="female"
                          name="radio-button-demo"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Số điện thoại</label>
                    <FormBox
                      propsInput={{
                        name: "phoneNumber",
                        placeholder: "Số điện thoại",
                        onChange: handleChangeInfo,
                        onFocus: handleFocusInfo,
                        value: formInfo.phoneNumber,
                        disabled: false,
                      }}
                      error={errorInfo.phoneNumber}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Email</label>
                    <FormBox
                      propsInput={{
                        name: "email",
                        placeholder: "Email",
                        onChange: handleChangeInfo,
                        onFocus: handleFocusInfo,
                        value: formInfo.email,
                        disabled: true,
                      }}
                      error={errorInfo.email}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ marginRight: 12 }}>Địa chỉ</label>
                    <FormBox
                      propsInput={{
                        name: "address",
                        placeholder: "Địa chỉ",
                        onChange: handleChangeInfo,
                        onFocus: handleFocusInfo,
                        value: formInfo.address,
                        disabled: false,
                      }}
                      error={errorInfo.address}
                    />
                  </div>
                </ReForm>
              ) : (
                <ReForm style={{ height: 290 }}>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ width: 220 }}>Password cũ</label>
                    <FormBox
                      propsInput={{
                        name: "password",
                        type: "password",
                        placeholder: "Password cũ",
                        onChange: handleChangePass,
                        onFocus: handleFocusPass,
                        value: formPassword.password,
                        disabled: false,
                      }}
                      error={errorPassword.password}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ width: 220 }}>Password mới</label>
                    <FormBox
                      propsInput={{
                        name: "newPassword",
                        type: "password",
                        placeholder: "Password mới",
                        onChange: handleChangePass,
                        onFocus: handleFocusPass,
                        value: formPassword.newPassword,
                        disabled: false,
                      }}
                      error={errorPassword.newPassword}
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ marginBottom: 12 }}
                  >
                    <label style={{ width: 220 }}>Xác nhận password mới</label>
                    <FormBox
                      propsInput={{
                        name: "confirmNewPassword",
                        type: "password",
                        placeholder: "Xác nhận password mới",
                        onChange: handleChangePass,
                        onFocus: handleFocusPass,
                        value: formPassword.confirmNewPassword,
                        disabled: false,
                      }}
                      error={errorPassword.confirmNewPassword}
                    />
                  </div>
                </ReForm>
              )}
              <div className="center full-width">
                <button
                  className="btn btn-client btn--save"
                  onClick={(event) => {
                    if (!value) {
                      event.preventDefault();
                      const errorState = validateInfo();
                      if (Object.keys(errorState).length > 0) {
                        return setErrorInfo(errorState);
                      }
                      // callAPI update info
                    } else {
                      event.preventDefault();
                      const errorState = validatePass();
                      if (Object.keys(errorState).length > 0) {
                        return setErrorPassword(errorState);
                      }
                      // update API password
                    }
                  }}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
