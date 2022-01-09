import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { Avatar } from "antd";
import { ArrowDropDown } from "@material-ui/icons";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function AvatarMenu() {
  const history = useHistory();
  const handleMenuClick = (e) => {
    console.log(e);
    if (Number(e.key) === 0) {
      Cookies.remove("accessToken");
      history.push("/admin");
    }
  };
  return (
    <Dropdown
      overlay={() => (
        <Menu onClick={handleMenuClick} className="menu-header-admin">
          {[
            // {
            //   name: "Hồ sơ cá nhân",
            //   icon: <AccountBoxIcon color="action" />,
            // },
            {
              name: "Đăng xuất",
              icon: <PowerSettingsNewIcon color="action" />,
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
