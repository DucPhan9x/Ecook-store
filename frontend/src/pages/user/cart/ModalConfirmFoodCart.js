import { IconButton, Input } from "@material-ui/core";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  formatCurrency,
  getPriceItem,
  getPriceItemNumber,
} from "utils/priceUtils";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { VOUCHERS_DATA } from "utils/dummyData";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PaypalCheckoutButton from "components/common/PaypalCheckoutButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ModalConfirmFoodCart = ({ isModalVisible, close, products }) => {
  const [data, setData] = useState({
    customerName: "",
    addressCustomer: "",
    phoneNumber: "",
    email: "",
    total: 0,
    items: [],
    shipmentFee: 0,
    paymentMethod: "",
    voucher: "",
  });

  const [isOpenVoucher, setIsOpenVoucher] = useState(false);
  useEffect(() => {
    setData({
      customerName: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      addressCustomer: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
      paymentMethod: "Momo",
      shipmentFee: 15000,
      merchandiseSubtotal: 20000, // tien san pham chua tinh ship
      total: products
        .map((item) => ({
          ...item.food,
          quantity: item.quantity,
        }))
        .reduce(
          (f, s) =>
            f +
            getPriceItemNumber(
              s?.discountOff,
              s?.unitPrice,
              s?.discountMaximum,
              s.quantity
            ),
          0
        ), // tong tien bao gom ship fee
      items: products.map((item) => ({
        ...item.food,
        quantity: item.quantity,
      })),
    });
  }, [products]);

  const [openPaypalButtonCheckout, setOpenPaypalButtonCheckout] =
    useState(false);

  return (
    <Modal
      className="modal-container modal-confirm-food-cart"
      title="Đơn hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      {openPaypalButtonCheckout ? (
        <>
          <div
            className="flex"
            style={{ marginBottom: 24, cursor: "pointer" }}
            onClick={() => setOpenPaypalButtonCheckout(false)}
          >
            <ArrowBackIcon color="action" />
            <span style={{ color: "orangered" }}>Quay trở lại</span>
          </div>
          <PaypalCheckoutButton
            type="food"
            requestData={{
              address: data.addressCustomer,
              shipmentFee: 15000, // will call API to calculate from address,
              voucherId: data.voucherId || "",
              voucherData: data.voucherData,
              items: data.items.map((i) => ({
                itemId: i._id,
                quantity: i.quantity,
                unitPrice: getPriceItemNumber(
                  i.discountOff,
                  i.unitPrice,
                  i.discountMaximum
                ),
              })),
            }}
          />
        </>
      ) : (
        <>
          <div className="modal-confirm-food-cart-container">
            <div className="modal-confirm-food-cart-container__inner">
              <div className="modal-confirm-food-cart-container__inner-top">
                <div className="block__order-info">
                  <label>Họ tên khách hàng:</label>
                  <Input value={data?.customerName} />
                </div>
                <div className="block__order-info">
                  <label>Địa chỉ giao hàng:</label>
                  <Input value={data?.addressCustomer} />
                </div>
                <div className="block__order-info">
                  <label>Số điện thoại:</label>
                  <Input value={data?.phoneNumber} />
                </div>
                <div className="block__order-info">
                  <label>Email:</label>
                  <Input value={data?.email} />
                </div>
              </div>
              <div className="block__items-detail">
                <span>Chi tiết đơn hàng</span>
                <div className="block__items-detail-content">
                  <div className="block__items-detail-content__inner">
                    {data.items?.map((item) => (
                      <div
                        key={item._id}
                        className="block__items-detail-content__inner--item"
                      >
                        <img src={item.imageUrl} alt="" />
                        <div className="block-details-item">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </div>
                          <div>
                            {getPriceItem(
                              item.discountOff,
                              item.unitPrice,
                              item.discountMaximum,
                              item.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Tổng sản phẩm: </label>
                <span>{data?.items.length} s/p</span>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Tổng tiền hàng:</label>
                <span>{formatCurrency(data?.total)}</span>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Phí vận chuyển:</label>
                <span>{formatCurrency(data?.shipmentFee)}</span>
              </div>
              <div
                className="block-data-normal flex items-center j-space-between"
                style={{ width: "100%" }}
              >
                <label style={{ marginRight: 12 }}>
                  Mã khuyến mãi (nếu có):
                </label>
                <div className="voucher-list-modal">
                  <Input value={data?.voucher} />
                  <IconButton onClick={() => setIsOpenVoucher(true)}>
                    <KeyboardArrowRightIcon color="action" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>

          <div className="block-momo-direct-moneny">
            <button
              className={`btn btn-client btn-momo ${
                data?.paymentMethod === "paypal" ? "btn-disabled" : ""
              }`}
              onClick={() => setData({ ...data, paymentMethod: "paypal" })}
            >
              Paypal
            </button>

            <button
              className={`btn btn-client btn-money ${
                data?.paymentMethod !== "paypal" ? "btn-disabled" : ""
              }`}
              onClick={() => setData({ ...data, paymentMethod: "money" })}
            >
              <LocalAtmIcon style={{ fontSize: 26 }} />
              Tiền mặt
            </button>
          </div>
          <div
            className="btn-order-food"
            onClick={() => {
              if (data?.paymentMethod === "paypal") {
                setOpenPaypalButtonCheckout(true);
              } else {
                close();
              }
            }}
          >
            Đặt hàng
          </div>
        </>
      )}

      <Modal
        className="modal-container modal-confirm-food-cart"
        title="Danh sách voucher hiện có"
        visible={isOpenVoucher}
        onCancel={() => setIsOpenVoucher(false)}
        footer={false}
      >
        <div>
          {VOUCHERS_DATA.map((item) => (
            <div key={item._id} style={{ marginBottom: 10 }}>
              <span
                style={{ fontSize: 18, color: "gray", cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(item.name);
                  setData({
                    ...data,
                    voucher: item.name,
                    voucherId: item._id,
                    voucherData: item,
                  });
                  setIsOpenVoucher(false);
                }}
              >
                {item.name}:{" "}
              </span>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      </Modal>
    </Modal>
  );
};
export default ModalConfirmFoodCart;
