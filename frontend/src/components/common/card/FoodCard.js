import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from "react-router-dom";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import useNotification from "hooks/useNotification";

const FoodCard = ({ data }) => {
  const { name, unitPrice, imageUrl, discountOff, discountMaximum } = data;
  const history = useHistory();
  return (
    <div className="food-card">
      <div className="food-card__inner">
        <img
          onClick={() => history.push(`/food?id=${data._id}`)}
          src={imageUrl}
          alt=""
          className="food-card__inner--picture"
        />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <div className="flex items-center">
              <span className={discountOff !== 0 ? "f-price" : "f-new-price"}>
                {formatCurrency(unitPrice)}
              </span>
              {discountOff !== 0 && (
                <span className="f-new-price">
                  {formatCurrency(
                    getPriceItem(discountOff, unitPrice, discountMaximum)
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="block-action-food">
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                // call API add cart
                useNotification.Success({
                  title: "",
                  message: "Đã thêm vào bộ sưu tập",
                });
              }}
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <div>
              <Tooltip title="Mua ngay" placement="top">
                <IconButton>
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng" placement="top">
                <IconButton
                  onClick={() => {
                    // call API add cart
                    useNotification.Success({
                      title: "",
                      message: "Đã thêm vào giỏ hàng",
                    });
                  }}
                >
                  <ShoppingBasketIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
