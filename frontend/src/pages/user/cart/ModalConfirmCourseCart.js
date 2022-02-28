import { IconButton, Input } from "@material-ui/core";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  formatCurrency,
  getPriceItem,
  getPriceItemNumber,
} from "utils/priceUtils";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PaypalCheckoutButton from "components/common/PaypalCheckoutButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ModalVoucher from "./ModalVoucher";
import { useSelector } from "react-redux";
import { SpinLoading } from "components/common";

const ModalConfirmCourseCart = ({
  isModalVisible,
  close,
  products = [],
  closeCartModal,
}) => {
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
          ...item.item,
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
      items: products?.map((item) => ({
        ...item.item,
        quantity: item.quantity,
        _id: item._id,
        itemId: item.itemId,
      })),
    });
  }, [products]);

  const [openPaypalButtonCheckout, setOpenPaypalButtonCheckout] =
    useState(false);
  const orderStore = useSelector((store) => store.order);

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
          {orderStore?.paymentCourse.loading && <SpinLoading />}
          <div
            className="flex"
            style={{ marginBottom: 24, cursor: "pointer" }}
            onClick={() => setOpenPaypalButtonCheckout(false)}
          >
            <ArrowBackIcon color="action" />
            <span style={{ color: "orangered" }}>Quay trở lại</span>
          </div>
          <PaypalCheckoutButton
            closeCartModal={closeCartModal}
            type="course"
            requestData={{
              voucherId: data?.voucherId || "",
              voucherData: data?.voucherData,
              shipmentFee: 0,
              items: data?.items.map((i) => ({
                itemId: i.itemId,
                _id: i._id,
                quantity: 1,
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
                <div className="block__items-detail-content__inner">
                  {data?.items?.map((item) => (
                    <div
                      key={item._id}
                      className="block__items-detail-content__inner--item"
                    >
                      <div className="block-details-item">
                        <div className="flex items-center">
                          <iframe
                            style={{
                              maxHeight: 200,
                              maxWidth: 200,
                              marginRight: 10,
                              marginLeft: "-20px",
                            }}
                            id={item._id}
                            src={
                              item.videoList?.length > 0 &&
                              item.videoList[0]?.videoUrl
                            }
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                          />
                          <span>{item.courseName}</span>
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
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Tổng sản phẩm: </label>
                <span>{data?.items.length} s/p</span>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Tổng tiền:</label>
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
          <div
            className="btn-order-food"
            onClick={() => setOpenPaypalButtonCheckout(true)}
          >
            Đặt hàng
          </div>
        </>
      )}

      {isOpenVoucher && (
        <ModalVoucher
          isOpenModal={isOpenVoucher}
          close={() => setIsOpenVoucher(false)}
          data={data}
          setData={setData}
        />
      )}
    </Modal>
  );
};
export default ModalConfirmCourseCart;
