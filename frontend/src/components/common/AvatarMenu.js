import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { Avatar } from "antd";
import { ArrowDropDown } from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { setToken, setUserDetail } from "redux/actions/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRoleName } from "utils/convertUtils";

export default function AvatarMenu({ openModalProfile }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { information } = useSelector((store) => store.common)?.userDetail;

  const handleMenuClick = (e) => {
    if (Number(e.key) === 1) {
      Cookies.remove("accessToken");
      Cookies.remove("profile");
      dispatch(setToken(""));
      dispatch(setUserDetail({}));
      history.push("/admin");
    } else {
      openModalProfile();
    }
  };
  return (
    <Dropdown
      overlay={() => (
        <Menu onClick={handleMenuClick} className="menu-header-admin">
          {[
            {
              name: "Hồ sơ cá nhân",
              icon: <AccountBoxIcon color="action" />,
            },
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
        <Avatar
          alt={information?.fullName}
          src={
            information?.imageUrl ||
            "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
          }
        />
        <div className="flex flex-col align-flex-start block-infor-user">
          <span className="block-infor-user--name">
            {information?.fullName || "Unknown"}
          </span>
          <span className="block-infor-user--role">
            {getRoleName(information?.roleId) || "Unknown"}
          </span>
        </div>
        <ArrowDropDown color="action" />
      </Button>
    </Dropdown>
  );
}
