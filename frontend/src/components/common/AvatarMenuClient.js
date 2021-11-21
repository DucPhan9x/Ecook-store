import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { Avatar } from "antd";
import { ArrowDropDown } from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import HistoryIcon from "@material-ui/icons/History";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export default function AvatarMenuClient() {
  const handleMenuClick = (e) => {
    console.log(e);
  };
  return (
    <Dropdown
      overlay={() => (
        <Menu onClick={handleMenuClick} className="menu-header-admin">
          {[
            {
              name: "Hồ sơ cá nhân",
              icon: <AccountBoxIcon color="secondary" />,
            },
            {
              name: "Lịch sử mua hàng",
              icon: <HistoryIcon color="secondary" />,
            },
            { name: "Ví vouchers", icon: <LocalMallIcon color="secondary" /> },
            {
              name: "Đăng xuất",
              icon: <PowerSettingsNewIcon color="secondary" />,
            },
          ].map((o, index) => (
            <Menu.Item key={index} className="flex">
              {o.icon}
              {o.name}
            </Menu.Item>
          ))}
        </Menu>
      )}
      className="btn-avatar-menu"
    >
      <Button className="flex">
        <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
        <div className="flex flex-col align-flex-start block-infor-user">
          <span className="block-infor-user--name">Trong Duc</span>
          <span className="block-infor-user--role">Admin</span>
        </div>
        <ArrowDropDown color="action" />
      </Button>
    </Dropdown>
  );
}
