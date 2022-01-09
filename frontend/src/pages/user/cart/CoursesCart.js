import { Checkbox } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPriceItem, getPriceItemNumber } from "utils/priceUtils";
import ModalConfirm from "components/common/ModalConfirm";
import { COURSES_CART } from "utils/dummyData";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "antd";
import FoodCartEmpty from "assets/images/empty-cart.svg";

const CoursesCart = ({ close }) => {
  const [data, setData] = useState([]);
  const [isOpenModalConfirmRemoveAll, setIsOpenModalConfirmRemoveAll] =
    useState(false);

  useEffect(() => {
    setData(COURSES_CART.map((item) => ({ ...item, isCheckbox: false })));
    // eslint-disable-next-line
  }, []);
  const [isCheckAll, setIsCheckAll] = useState(false);
  return (
    <>
      <div className="modal-body-cart-container__inner-body-top">
        <div className="block__check-all">
          <Checkbox
            disabled={!data.length}
            checked={isCheckAll}
            onChange={(e) => {
              let isChecked = e.target.checked;
              setIsCheckAll(isChecked);
              setData(data.map((item) => ({ ...item, isCheckbox: isChecked })));
            }}
          />
          <span className="selected--text">
            {data?.filter((item) => item.isCheckbox)?.length} được chọn
          </span>{" "}
        </div>
        <button
          disabled={!data.length}
          className={`btn btn-client ${!data.length ? "btn-disabled" : ""}`}
          onClick={() => {
            setIsOpenModalConfirmRemoveAll(true);
          }}
        >
          Xóa hết
        </button>
      </div>
      <div className="modal-body-cart-container__inner-body">
        <div className="modal-body-cart-container__inner-body-bottom">
          <div className="food-cart-container">
            {data?.length > 0 ? (
              data.map((c) => (
                <div className="food-cart-container__inner" key={c._id}>
                  <Checkbox
                    checked={c.isCheckbox}
                    onChange={(e) => {
                      let temp = [...data];
                      const indexSelected = temp.findIndex(
                        (item) => item._id === c._id
                      );
                      temp[indexSelected].isCheckbox = e.target.checked;
                      setData(temp);
                    }}
                  />
                  <div className="food-cart-container__inner--information">
                    <video
                      src={c?.course?.videoUrls[0].videoUrl}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                    <div className="food-cart-container__inner--information-top">
                      <span className="food-cart-container__inner--information-top--title">
                        {c.course?.name} ({c?.course?.videoUrls?.length} bài)
                      </span>
                      <span className="food-cart-container__inner--information-top--description">
                        {c.course?.description}
                      </span>
                      <span
                        className="food-cart-container__inner--information-top--price"
                        style={{ marginTop: "-12px", marginBottom: 12 }}
                      >
                        {getPriceItem(
                          c.course?.discountOff,
                          c.course?.unitPrice,
                          c.course?.discountMaximum
                        )}
                      </span>
                    </div>
                    <Tooltip title="Xóa khỏi giỏ hàng" placement="top">
                      <IconButton
                        onClick={() =>
                          setData(data.filter((item) => item._id !== c._id))
                        }
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex items-center flex-col"
                style={{ marginTop: 120 }}
              >
                <span style={{ fontSize: 24, color: "gray" }}>
                  Giỏ hàng trống
                </span>
                <img src={FoodCartEmpty} alt="" />
              </div>
            )}
            <ModalConfirm
              isOpenModal={isOpenModalConfirmRemoveAll}
              close={() => {
                setIsOpenModalConfirmRemoveAll(false);
              }}
              title="Xác nhận"
              message="Bạn có chắc muốn xóa tất cả?"
              handleOk={() => {
                setData([]);
                setIsOpenModalConfirmRemoveAll(false);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`modal-body-cart-container__inner-bottom ${
          data.filter((item) => item.isCheckbox)?.length ? "" : "btn-disabled"
        }`}
        onClick={() => {
          close();
          window.open(
            "https://test-payment.momo.vn/gw_payment/payment/qr?partnerCode=MOMO&accessKey=F8BBA842ECF85&requestId=MM64101&amount=1100&orderId=MM64101&signature=cb36fa31ac0ec9cee047cf482a81292e8b8863dbd8e3ac0c97aa7208145fe810&requestType=captureMoMoWallet"
          );
        }}
      >
        {data
          .reduce(
            (f, s) =>
              f +
              getPriceItemNumber(
                s.course?.discountOff,
                s.course?.unitPrice,
                s.course?.discountMaximum,
                s.quantity
              ),
            0
          )
          ?.toLocaleString("vi-VI", {
            style: "currency",
            currency: "VND",
          })}{" "}
        - Thanh toán
      </div>
    </>
  );
};

export default CoursesCart;
