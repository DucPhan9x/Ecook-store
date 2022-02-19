import { IconButton, Input } from "@material-ui/core";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  formatCurrency,
  getPriceItem,
  getPriceItemNumber,
} from "utils/priceUtils";
import { VOUCHERS_DATA } from "utils/dummyData";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PaypalCheckoutButton from "components/common/PaypalCheckoutButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const ModalConfirmCourseCart = ({ isModalVisible, close, products }) => {
  const [data, setData] = useState({
    items: [],
    shipmentFee: 0,
    paymentMethod: "paypal",
    voucher: "",
  });

  const [isOpenVoucher, setIsOpenVoucher] = useState(false);
  useEffect(() => {
    setData({
      total: products
        .map((item) => ({
          ...item.course,
          quantity: item.quantity || 1,
        }))
        .reduce(
          (f, s) =>
            f +
            getPriceItemNumber(
              s?.discountOff,
              s?.unitPrice,
              s?.discountMaximum,
              s.quantity || 1
            ),
          0
        ),
      items: products.map((item) => ({
        ...item.course,
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
            requestData={{
              voucherId: data.voucherId || "",
              voucherData: data.voucherData,
              items: data.items.map((i) => ({
                itemId: i._id,
                quantity: i.quantity || 1,
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
              <div className="block__items-detail">
                <div className="block__items-detail-content">
                  <div className="block__items-detail-content__inner">
                    {data.items?.map((item) => (
                      <div
                        key={item._id}
                        className="block__items-detail-content__inner--item"
                      >
                        <div className="block-details-item">
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                          </div>
                          <div>
                            {getPriceItem(
                              item.discountOff,
                              item.unitPrice,
                              item.discountMaximum,
                              item.quantity || 1
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
                <label style={{ marginRight: 12 }}>Tổng tiền khóa học:</label>
                <span>{formatCurrency(data?.total)}</span>
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
          <PaypalCheckoutButton
            type="course"
            requestData={{
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
export default ModalConfirmCourseCart;
