import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { Avatar } from "antd";

export default function AvatarMenu() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            className="btn-avatar-menu"
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            <Avatar alt="Remy Sharp" src="https://picsum.photos/200/300" />
            <span className="btn-avatar-menu--name">Name admin</span>
            <ArrowDropDown color="action" />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Hồ sơ cá nhân</MenuItem>
            <MenuItem onClick={popupState.close}>Đăng xuất</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
