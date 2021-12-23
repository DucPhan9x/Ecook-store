import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const FoodCard = ({ data }) => {
  const { name, unitPrice, imageUrl } = data;
  return (
    <div className="food-card">
      <div className="food-card__inner">
        <img src={imageUrl} alt="" className="food-card__inner--picture" />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <span className="f-price">{unitPrice} đ</span>
          </div>
          <div className="block-action-food">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="secondary" />
            </IconButton>
            <div>
              <Tooltip title="Mua ngay" placement="top">
                <IconButton>
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng" placement="top">
                <IconButton>
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
