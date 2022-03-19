import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "utils/authUtils";
import ModalConfirm from "../ModalConfirm";
import { useDispatch } from "react-redux";
import { updateWishlist } from "redux/actions/wishlist";
import { buyNow, createCartItems } from "redux/actions/cart";
import useNotification from "hooks/useNotification";
import { checkExistInMyCourses } from "redux/actions/order";

const CourseCard = ({ data }) => {
  const {
    _id,
    courseName,
    unitPrice,
    videoList,
    discountOff,
    discountMaximum,
  } = data;
  const history = useHistory();
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="course-card" style={{ minWidth: 280 }}>
      <div className="course-card__inner">
        <iframe
          id={_id}
          src={videoList?.length > 0 && videoList[0]?.videoUrl}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span
              style={{ cursor: "pointer", marginBottom: 15 }}
              className="f-title"
              onClick={() => {
                history.push(`/course?id=${_id}`);
              }}
            >
              {courseName}
            </span>
            <div className="flex items-center">
              <span className={discountOff !== 0 ? "f-price" : "f-new-price"}>
                {formatCurrency(unitPrice)}
              </span>
              {discountOff !== 0 && (
                <span className="f-new-price">
                  {getPriceItem(discountOff, unitPrice, discountMaximum)}
                </span>
              )}
            </div>
          </div>
          <div className="block-action-food">
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                if (getAccessToken()) {
                  // call API add cart
                  dispatch(updateWishlist({ itemId: data._id, itemType: 3 }));
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <div>
              <Tooltip title="Mua ngay" placement="top">
                <IconButton
                  onClick={() => {
                    if (getAccessToken()) {
                      dispatch(
                        checkExistInMyCourses(_id, (res) => {
                          if (res.status === 200) {
                            if (!res.isExist) {
                              dispatch(
                                createCartItems(
                                  {
                                    itemId: _id,
                                    itemType: 2,
                                    quantity: 1,
                                  },
                                  (res) => {
                                    if (res.status === 201) {
                                      setTimeout(() => {
                                        dispatch(buyNow(_id));
                                      }, 300);
                                    }
                                  }
                                )
                              );
                            }
                          } else {
                            useNotification.Error({
                              title: "Message",
                              message: res.msg,
                            });
                          }
                        })
                      );
                    } else {
                      setIsOpenModalConfirm(true);
                    }
                  }}
                >
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng" placement="top">
                <IconButton
                  onClick={() => {
                    if (getAccessToken()) {
                      // call API add cart
                      dispatch(
                        checkExistInMyCourses(_id, (res) => {
                          if (res.status === 200) {
                            if (!res.isExist) {
                              dispatch(
                                createCartItems({
                                  itemId: data._id,
                                  itemType: 2,
                                  quantity: 1,
                                })
                              );
                            }
                          } else {
                            useNotification.Error({
                              title: "Message",
                              message: res.msg,
                            });
                          }
                        })
                      );
                    } else {
                      setIsOpenModalConfirm(true);
                    }
                  }}
                >
                  <ShoppingBasketIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        title="Thông báo"
        message="Bạn cần đăng nhập để tiếp tục, bạn muốn tiếp tục ?"
        isOpenModal={isOpenModalConfirm}
        close={() => setIsOpenModalConfirm(false)}
        handleOk={() => {
          history.push("/login");
        }}
      />
    </div>
  );
};

export default CourseCard;
