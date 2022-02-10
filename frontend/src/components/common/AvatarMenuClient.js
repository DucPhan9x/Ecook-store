import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { Avatar } from "antd";
import { ArrowDropDown } from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DescriptionIcon from "@material-ui/icons/Description";
import LaptopChromebookIcon from "@material-ui/icons/LaptopChromebook";
import { useHistory } from "react-router-dom";
import {
  ROUTE_CLIENT_MY_COURSES,
  ROUTE_CLIENT_MY_ORDERS,
  ROUTE_CLIENT_MY_PROFILE,
} from "utils/routes";
import Cookies from "js-cookie";
import { setToken, setUserDetail } from "redux/actions/common";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AvatarMenuClient() {
  const { information } = useSelector((store) => store.common)?.userDetail;

  const history = useHistory();
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    let url = "";
    switch (Number(e.key)) {
      case 0: {
        url = ROUTE_CLIENT_MY_PROFILE;
        break;
      }
      case 1: {
        url = ROUTE_CLIENT_MY_ORDERS;
        break;
      }

      case 2: {
        url = ROUTE_CLIENT_MY_COURSES;
        break;
      }
      default: {
        // clear local storage/cookies
        Cookies.remove("accessToken");
        Cookies.remove("profile");
        dispatch(setToken(""));
        dispatch(setUserDetail({}));
        url = "/login";
        break;
      }
    }
    history.push(url);
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
              name: "Lịch sử đơn hàng",
              icon: <DescriptionIcon color="secondary" />,
            },
            {
              name: "Khóa học hiện có",
              icon: <LaptopChromebookIcon color="secondary" />,
            },
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
        <Avatar
          alt={information?.fullName || "Unknown"}
          src={
            information?.imageUrl ||
            "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
          }
        />
        <div className="flex flex-col align-flex-start block-infor-user">
          <span className="block-infor-user--name">
            {information?.fullName || "Unknown"}
          </span>
        </div>
        <ArrowDropDown color="action" />
      </Button>
    </Dropdown>
  );
}
