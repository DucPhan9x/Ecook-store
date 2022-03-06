import React from "react";
import { Modal } from "antd";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import { useEffect } from "react";
import moment from "moment";

const ModalEdit = ({ isModalVisible, handleSubmit, close, data }) => {
  const [error, setError] = React.useState({});

  const [form, setForm] = React.useState({
    name: "",
    discountOff: 0,
    discountMaximum: 0,
    minOrder: 0,
    remainingSlot: 0,
    expiredDate: new Date(moment(Date.now()).add(1, "days")),
  });

  useEffect(() => {
    console.log({ data });
    setForm(data);
  }, [data]);

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Không được để trống!";
    }
    if (!form.discountOff) {
      errorState.discountOff = "Thông tin chưa hợp lệ!";
    }
    if (!form.discountMaximum) {
      errorState.discountMaximum = "Thông tin chưa hợp lệ!";
    }
    if (!form.minOrder) {
      errorState.minOrder = "Thông tin chưa hợp lệ!";
    }
    if (!form.remainingSlot) {
      errorState.remainingSlot = "Thông tin chưa hợp lệ!";
    }
    return errorState;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    handleSubmit(form);
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

  return (
    <Modal
      className="modal-container"
      title="Tạo mới voucher"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      onCancel={() => {
        close();
      }}
    >
      <ReForm>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Mã khuyến mãi</label>
            <FormBox
              propsInput={{
                name: "name",
                placeholder: "Mã khuyến mãi",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.name,
                disabled: false,
              }}
              error={error.name}
            />
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Giảm giá (%)</label>
            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "discountOff",
                placeholder: "Giảm giá (%)",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.discountOff,
                disabled: false,
              }}
              error={error.discountOff}
            />
          </div>
          <div className="block-label-input-modal" style={{ marginLeft: 12 }}>
            <label>Giá giảm tối đa (VND)</label>

            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "discountMaximum",
                placeholder: "Giá giảm tối đa (VND)",
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
            <label>Tổng đơn tối thiểu (VNĐ)</label>
            <FormBox
              propsInput={{
                type: "number",
                min: "0",
                name: "minOrder",
                placeholder: "Tổng đơn tối thiểu (VNĐ)",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.minOrder,
                disabled: false,
              }}
              error={error.minOrder}
            />
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Số lượng sử dụng còn lại</label>
            <FormBox
              propsInput={{
                type: "number",
                name: "remainingSlot",
                placeholder: "Số lượng sử dụng còn lại",
                min: 0,
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.remainingSlot,
                disabled: false,
              }}
              error={error.remainingSlot}
            />
          </div>
        </div>
        <div className="block-label-input-modal">
          <label>Hạn áp dụng</label>
          <FormBox
            propsInput={{
              type: "date",
              name: "expiredDate",
              placeholder: "Hạn áp dụng",
              onChange: handleChange,
              onFocus: handleFocus,
              min: moment(new Date()).add(1, "days").format("YYYY-MM-DD"),
              value: moment(form.expiredDate).format("YYYY-MM-DD"),
              disabled: false,
            }}
            error={error.expiredDate}
          />
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalEdit;
