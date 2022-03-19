import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router-dom";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import ModalConfirm from "../ModalConfirm";
import { getAccessToken } from "utils/authUtils";
import { useDispatch } from "react-redux";
import { updateWishlist } from "redux/actions/wishlist";
import { buyNow, createCartItems } from "redux/actions/cart";
import EmptyFood from "assets/images/emptyFood.jpg";

const FoodCard = ({ data }) => {
  const {
    name,
    unitPrice,
    imageUrl,
    discountOff,
    discountMaximum,
    unit,
    isRemoveTemp,
  } = data;
  const history = useHistory();
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="food-card">
      <div className="food-card__inner">
        <img
          onClick={() => {
            if (isRemoveTemp) return;
            history.push(`/food?id=${data._id}`);
          }}
          src={!isRemoveTemp ? imageUrl : EmptyFood}
          alt=""
          className="food-card__inner--picture"
        />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title" style={{ marginBottom: 15 }}>
              {name} (1 {unit})
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
                  dispatch(updateWishlist({ itemId: data._id, itemType: 1 }));
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
                  disabled={isRemoveTemp}
                  onClick={() => {
                    if (getAccessToken()) {
                      // call API add cart => open food cart
                      dispatch(
                        createCartItems(
                          {
                            itemId: data._id,
                            itemType: 1,
                            quantity: 1,
                          },
                          (res) => {
                            if (res.status === 201) {
                              setTimeout(() => {
                                dispatch(buyNow(data._id));
                              }, 300);
                            }
                          }
                        )
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
                  disabled={isRemoveTemp}
                  onClick={() => {
                    if (getAccessToken()) {
                      // call API add cart
                      dispatch(
                        createCartItems({
                          itemId: data._id,
                          itemType: 1,
                          quantity: 1,
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

export default FoodCard;
