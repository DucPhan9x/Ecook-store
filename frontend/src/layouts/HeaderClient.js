import React, { useState } from "react";
// import { Input } from "antd";
import {
  // SearchOutlined,
  HeartTwoTone,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CartIcon from "assets/icons/shopping-cart.png";
import { useHistory } from "react-router";
import { Tooltip } from "antd";
import Logo from "assets/images/clientLogo.png";
import ModalCart from "pages/user/cart/ModalCart";
import { ROUTE_CLIENT_FAVORITES } from "utils/routes";
import { AvatarMenuClient } from "components/common";
import { getAccessToken } from "utils/authUtils";
import ModalConfirm from "components/common/ModalConfirm";
import { useSelector } from "react-redux";

const HeaderClient = () => {
  const history = useHistory();
  const [openFoodsCart, setOpenFoodsCart] = useState(false);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const { token } = useSelector((store) => store.common);

  return (
    <div className="header-client">
      <div className="header-client__inner">
        <div className="header-client__inner--left">
          <h3 onClick={() => history.push("/")}>
            <img style={{ height: 70, width: 180 }} src={Logo} alt="" />
          </h3>
          {/* <Input placeholder="Tìm kiếm thông tin" prefix={<SearchOutlined />} /> */}
        </div>
        <div className="header-client__inner--right">
          <Tooltip title="Bộ sưu tập" placement="bottom">
            <HeartTwoTone
              twoToneColor="#eb2f96"
              className="favorite-items"
              onClick={() => {
                if (getAccessToken()) {
                  history.push(ROUTE_CLIENT_FAVORITES);
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            />
          </Tooltip>
          <Tooltip title="Giỏ hàng" placement="bottom">
            <div
              className="btn--cart-item"
              onClick={() => {
                if (getAccessToken()) {
                  setOpenFoodsCart(true);
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <img src={CartIcon} alt="Cart item" />
            </div>
          </Tooltip>

          <div className="block--action-at-header hotline">
            <PhoneOutlined />
            <span>1900 1005</span>
          </div>
          {token ? (
            <AvatarMenuClient />
          ) : (
            <div
              className="block--action-at-header"
              onClick={() => history.push("/login")}
            >
              <UserOutlined />
              <span>Đăng nhập</span>
            </div>
          )}
        </div>
      </div>
      <ModalCart
        isModalVisible={openFoodsCart}
        close={() => setOpenFoodsCart(false)}
      />
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

export default HeaderClient;
