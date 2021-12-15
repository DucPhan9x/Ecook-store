import React from "react";
import { Modal } from "antd";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isCurrency } from "validator";
import { Select } from "antd";
import UploadImage from "components/common/UploadImage";
import { Paper } from "@material-ui/core";
import NoImage from "assets/images/notImage.png";

const { Option } = Select;
const ModalCreated = ({ isModalVisible, handleSubmit, close }) => {
  const [error, setError] = React.useState({});

  const [form, setForm] = React.useState({
    name: "",
    type: "",
    unitPrice: 0,
    description: "",
    discountOff: 0,
    discountMaximum: 0,
    imageUrl: "",
    numOfStars: 0,
    numOfFeedbacks: 0,
  });

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Không được để trống!";
    }
    if (isEmpty(form.type)) {
      errorState.type = "Không được để trống!";
    }
    if (!isCurrency(form.unitPrice + "")) {
      errorState.unitPrice = "Nhập mệnh gía hợp lệ!";
    }
    return errorState;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    handleSubmit({ ...form, imageUrl: form.imageUrl[0]?.thumbUrl });
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
      name: "",
      type: "",
      unitPrice: 0,
      description: "",
      discountOff: 0,
      discountMaximum: 0,
      imageUrl: "",
      numOfStars: 0,
      numOfFeedbacks: 0,
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
      title="Tạo mới sản phẩm"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      onCancel={() => {
        close();
        handleReset();
      }}
    >
      <ReForm>
        <Paper
          className="add-edit-recipe-container-bottom--left"
          style={{ width: "100%", height: 200 }}
        >
          <img src={form?.imageUrl || NoImage} alt="avatar" />
          <UploadImage onChangeImage={handleChangeImage} />
        </Paper>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Tên sản phẩm</label>
            <FormBox
              propsInput={{
                name: "name",
                placeholder: "Tên sản phẩm",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.name,
                disabled: false,
              }}
              error={error.name}
            />
          </div>
          <div className="block-label-input-modal" style={{ marginLeft: 12 }}>
            <label>Loại sản phẩm</label>
            <Select
              placeholder="Chọn loại hiện có"
              style={{ width: "100%" }}
              onFocus={() =>
                setError({
                  ...error,
                  type: "",
                })
              }
              onChange={(value) => {
                setForm({ ...form, type: value });
              }}
              value={form.type}
            >
              {["Thịt", "Gia cầm", "Thủy hải sản", "Rau củ quả"].map(
                (item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                )
              )}
            </Select>
            <span className="error-message">{error.type}</span>
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Giá cả (VNĐ)</label>
            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "unitPrice",
                placeholder: "Giá cả (VNĐ)",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.unitPrice,
                disabled: false,
              }}
              error={error.unitPrice}
            />
          </div>
          <div className="block-label-input-modal" style={{ marginLeft: 12 }}>
            <label>Giảm giá (%)</label>

            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "discountOff",
                placeholder: "Giảm giá",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.discountOff,
                disabled: false,
              }}
              error={error.discountOff}
            />
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Mức giảm tối đa (VNĐ)</label>

            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "discountMaximum",
                placeholder: "Mức giảm tối đa (VNĐ)",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.discountMaximum,
                disabled: false,
              }}
              error={error.discountMaximum}
            />
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Mô tả sản phẩm</label>
            <FormBox
              propsInput={{
                type: "textarea",
                name: "description",
                placeholder: "Mô tả",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.description,
                disabled: false,
              }}
              error={error.description}
            />
          </div>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalCreated;
