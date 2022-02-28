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
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import PaypalCheckoutButton from "components/common/PaypalCheckoutButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Info } from "@material-ui/icons";
import { Tooltip } from "antd";
import useNotification from "hooks/useNotification";
import {
  ADDRESS_ECOOK_SYSTEM,
  distanceBetween2Points,
  getShipmentFee,
} from "utils/payment";
import Geocode from "react-geocode";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { FormBox, SpinLoading } from "components/common";
import ModalVoucher from "./ModalVoucher";
import { useDispatch } from "react-redux";
import { paymentRedirectMoney } from "redux/actions/order";

const ModalConfirmFoodCart = ({
  isModalVisible,
  close,
  products,
  closeCartModal,
}) => {
  const [data, setData] = useState({
    customerName: "",
    addressCustomer: "",
    phoneNumber: "",
    total: 0,
    items: [],
    shipmentFee: 0,
    paymentMethod: "",
    voucher: "",
  });

  const [isOpenVoucher, setIsOpenVoucher] = useState(false);
  const [paymentFee, setPaymentFee] = useState(0);
  const [distancePayment, setDistance] = useState(0);
  const { information } = useSelector((store) => store.common)?.userDetail;

  const [isOrder, setIsOrder] = useState(true);

  useEffect(() => {
    setData({
      customerName: information?.fullName,
      email: information?.email,
      phoneNumber: information?.phoneNumber,
      addressCustomer: information?.address,
      paymentMethod: "Momo",
      total: products
        ?.map((item) => ({
          ...item.item,
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
      items: products?.map((item) => ({
        ...item.item,
        quantity: item.quantity,
        _id: item._id,
        itemId: item.itemId,
      })),
    });

    //handle calculate shipment fee
    if (information.address) {
      handleUpdateShipmentFee(information.address);
    }
    // eslint-disable-next-line
  }, [products, information]);

  const handleUpdateShipmentFee = (addressTemp) => {
    Geocode.fromAddress(addressTemp).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const distanceTe = distanceBetween2Points(
          ADDRESS_ECOOK_SYSTEM.lat,
          ADDRESS_ECOOK_SYSTEM.lng,
          lat,
          lng
        );
        setDistance(Number(distanceTe));
        setPaymentFee(getShipmentFee(Number(distanceTe)));
        if (getShipmentFee(Number(distanceTe)) === -1) setIsOrder(false);
        else setIsOrder(true);
      },
      (error) => {
        setPaymentFee(-1);
        setDistance(-1);
        setIsOrder(false);

        useNotification.Error({
          title: "Message",
          message: "Địa chỉ không tồn tại, vui lòng kiểm tra!",
        });
      }
    );
  };

  const [openPaypalButtonCheckout, setOpenPaypalButtonCheckout] =
    useState(false);
  const [error, setError] = useState({
    customerName: "",
    phoneNumber: "",
    addressCustomer: "",
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(data?.customerName)) {
      errorState.customerName = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(data?.phoneNumber + "")) {
      errorState.phoneNumber = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(data?.addressCustomer + "")) {
      errorState.addressCustomer = "Vui lòng nhập vào, không được để trống!";
    }
    return errorState;
  };

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (!isOrder) return;
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    if (data?.paymentMethod === "paypal") {
      setOpenPaypalButtonCheckout(true);
    } else {
      dispatch(
        paymentRedirectMoney(
          {
            order: {
              address: data.addressCustomer,
              items: data.items.map((i) => ({
                itemId: i.itemId,
                _id: i._id,
                quantity: i.quantity,
                unitPrice: getPriceItemNumber(
                  i.discountOff,
                  i.unitPrice,
                  i.discountMaximum
                ),
              })),
              voucherId: data.voucherId,
              shipmentFee: paymentFee,
            },
          },
          (res) => {
            if (res.status === 200) {
              close();
              closeCartModal();
            }
          }
        )
      );
    }
  };
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
          {orderStore?.paymentFood.loading && <SpinLoading />}
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
            type="food"
            requestData={{
              address: data.addressCustomer,
              shipmentFee: paymentFee, // will call API to calculate from address,
              voucherId: data.voucherId || "",
              voucherData: data.voucherData,
              items: data.items.map((i) => ({
                itemId: i.itemId,
                _id: i._id,
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
          {orderStore?.paymentRedirectMoney.loading && <SpinLoading />}
          <div className="modal-confirm-food-cart-container">
            <div className="modal-confirm-food-cart-container__inner">
              <div className="modal-confirm-food-cart-container__inner-top">
                <div className="block__order-info">
                  <label>Họ tên khách hàng:</label>
                  <FormBox
                    propsInput={{
                      name: "customerName",
                      placeholder: "Số điện thoại",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: data.customerName,
                      disabled: false,
                    }}
                    error={error.customerName}
                  />
                </div>
                <div className="block__order-info">
                  <label>Địa chỉ giao hàng:</label>
                  <div className="flex items-center address-order-field">
                    <FormBox
                      propsInput={{
                        name: "addressCustomer",
                        placeholder: "Địa chỉ giao hàng",
                        onChange: handleChange,
                        onFocus: handleFocus,
                        value: data.addressCustomer,
                        disabled: false,
                      }}
                      error={error.addressCustomer}
                    />
                    <button
                      className="btn btn-client"
                      style={{ width: "16%", marginLeft: 6 }}
                      onClick={() =>
                        handleUpdateShipmentFee(data.addressCustomer)
                      }
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
                <div className="block__order-info">
                  <label>Số điện thoại:</label>
                  <FormBox
                    propsInput={{
                      name: "phoneNumber",
                      placeholder: "Số điện thoại",
                      onChange: handleChange,
                      onFocus: handleFocus,
                      value: data.phoneNumber,
                      disabled: false,
                    }}
                    error={error.phoneNumber}
                  />
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
                <span>{data?.items?.length} s/p</span>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Tổng tiền hàng:</label>
                <span>{formatCurrency(data?.total)}</span>
              </div>
              <div className="block-data-normal flex items-center">
                <label style={{ marginRight: 12 }}>Phí vận chuyển:</label>
                {paymentFee !== -1 ? (
                  <span>{formatCurrency(paymentFee)}</span>
                ) : (
                  0
                )}
                {distancePayment !== -1 && (
                  <span
                    style={{ marginLeft: 6, fontSize: 14, color: "#292929" }}
                  >
                    ({distancePayment}km)
                  </span>
                )}
                <Tooltip
                  title={`
                * Quy định tính phí ship:                                 
                .Dưới 2km: 0đ;
                ; dưới 6km: 10.000đ
                ; dưới 8km: Hệ thống sẽ thống theo công thức: 1.8*(số km)*1000(đ)
                ; trên 8km: Cửa hàng không ship.
                `}
                  placement="top"
                >
                  <Info
                    color="action"
                    style={{ fontSize: 18, marginLeft: "auto", marginRight: 6 }}
                  />
                </Tooltip>
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
          <div className="btn-order-food" onClick={onSubmit}>
            Đặt hàng
          </div>
        </>
      )}

      {isOpenVoucher && (
        <ModalVoucher
          isOpenModal={isOpenVoucher}
          close={() => setIsOpenVoucher(false)}
          data={{ ...data, shipmentFee: paymentFee }}
          setData={setData}
        />
      )}
    </Modal>
  );
};
export default ModalConfirmFoodCart;
