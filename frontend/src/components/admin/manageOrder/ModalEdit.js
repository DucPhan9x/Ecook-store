import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import { PopoverStickOnHover } from "components/common";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import moment from "moment";
import { Grid } from "@material-ui/core";
import StepComponent from "components/common/StepComponent";

const ModalEdit = ({ isModalVisible, handleSubmit, close, selectedItem }) => {
  const [form, setForm] = React.useState({
    _id: "",
    customer: {},
    employee: {},
    createdAt: Date.now(),
    address: "",
    voucher: {},
    isPaid: true,
    orderStatus: {},
    paymentMethod: "",
    shipmentFee: "",
    merchandiseSubtotal: "",
    total: "",
    items: [],
  });

  useEffect(() => {
    if (!Object.keys(selectedItem)?.length) return;
    setForm(selectedItem);
  }, [selectedItem]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log({ form });
    handleSubmit(form);
    close();
  };

  return (
    <Modal
      className="modal-container"
      title="Thông tin đơn hàng"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      onCancel={() => {
        close();
      }}
    >
      <StepComponent />
      <ReForm className="flex flex-col" style={{ padding: "0 12px" }}>
        <div className="block_field-modal-edit-order">
          <label>Mã hàng</label>
          <span>{form?._id}</span>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Khách hàng</label>
          <PopoverStickOnHover
            component={
              <div className="popover-show-info-student-container">
                <div className="popover-show-info-student-container--item">
                  <span>{form?.customer._id}</span>
                </div>
                <div className="popover-show-info-student-container--item">
                  <PhoneAndroidIcon />
                  <span>{form?.customer.phoneNumber}</span>
                </div>
                <div className="popover-show-info-student-container--item">
                  <MailOutlineIcon />
                  <span>{form?.customer.email}</span>
                </div>
              </div>
            }
            placement="top"
            onMouseEnter={() => {}}
            delay={200}
          >
            <span>{form.customer?.name}</span>
          </PopoverStickOnHover>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Nhân viên</label>
          {form?.employee._id ? (
            <PopoverStickOnHover
              component={
                <div className="popover-show-info-student-container">
                  <div className="popover-show-info-student-container--item">
                    <span>{form?.employee._id}</span>
                  </div>
                  <div className="popover-show-info-student-container--item">
                    <PhoneAndroidIcon />
                    <span>{form?.employee.phoneNumber}</span>
                  </div>
                  <div className="popover-show-info-student-container--item">
                    <MailOutlineIcon />
                    <span>{form?.employee.email}</span>
                  </div>
                </div>
              }
              placement="top"
              onMouseEnter={() => {}}
              delay={200}
            >
              <span>{form?.employee.name}</span>
            </PopoverStickOnHover>
          ) : (
            <span>Chưa có</span>
          )}
        </div>
        <div className="block_field-modal-edit-order">
          <label>Danh sách mặt hàng</label>
          <div className="flex flex-col">
            {form.items.map((item) => (
              <Grid container spacing={2} key={item?._id}>
                <Grid item xs={4}>
                  {item.foodName}
                </Grid>
                <Grid item xs={4}>
                  {item.quantity} {item.unitType}
                </Grid>
                <Grid item xs={4}>
                  {item.quantity * item.unitPrice}
                </Grid>
              </Grid>
            ))}
          </div>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Địa chỉ giao hàng</label>
          <span>{form?.address}</span>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Ngày tạo</label>
          <span>{moment(form?.createdAt).format("DD/MM/YYYY")}</span>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Phí ship</label>
          <span>{form?.shipmentFee} VND</span>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Khuyến mãi áp dụng voucher {form?.voucher?.name}</label>
          <span>{form.voucher?.discount} VND</span>
        </div>
        <div className="block_field-modal-edit-order">
          <label>Tổng tiền</label>
          <span>{form.total} VND</span>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalEdit;
