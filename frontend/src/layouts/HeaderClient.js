import React from "react";
import { Input } from "antd";
import {
  SearchOutlined,
  HeartTwoTone,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CartIcon from "assets/icons/shopping-cart.png";
import { useHistory } from "react-router";
import { Tooltip } from "antd";
import Logo from "assets/images/clientLogo.png";

const HeaderClient = () => {
  const history = useHistory();
  return (
    <div className="header-client">
      <div className="header-client__inner">
        <div className="header-client__inner--left">
          <h3 onClick={() => history.push("/")}>
            <img style={{ height: 70, width: 180 }} src={Logo} alt="" />
          </h3>
          <Input
            placeholder="Tìm công thức hoặc sản phẩm"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="header-client__inner--right">
          <Tooltip title="Bộ sưu tập" placement="bottom">
            <HeartTwoTone twoToneColor="#eb2f96" className="favorite-items" />
          </Tooltip>
          <Tooltip title="Giỏ hàng" placement="bottom">
            <div className="btn--cart-item">
              <img src={CartIcon} alt="Cart item" />
            </div>
          </Tooltip>

          <div className="block--action-at-header hotline">
            <PhoneOutlined />
            <span>1900 1005</span>
          </div>
          <div
            className="block--action-at-header"
            onClick={() => history.push("/login")}
          >
            <UserOutlined />
            <span>Đăng nhập</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
