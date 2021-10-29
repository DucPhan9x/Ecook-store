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

const HeaderClient = () => {
  const history = useHistory();
  console.log("aaaaaa");
  return (
    <div className="header-client">
      <div className="header-client__inner">
        <div className="header-client__inner--left">
          <h3 onClick={() => history.push("/")}>ECook</h3>
          <Input
            placeholder="Tìm công thức hoặc sản phẩm"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="header-client__inner--right">
          <Tooltip title="Bộ sưu tập">
            <HeartTwoTone twoToneColor="#eb2f96" className="favorite-items" />
          </Tooltip>
          <Tooltip title="Giỏ hàng">
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
