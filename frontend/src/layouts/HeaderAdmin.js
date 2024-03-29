import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "redux/actions/control";
import AvatarMenu from "components/common/AvatarMenu";
import ModalProfileAdmin from "components/common/modal/ModalProfileAdmin";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));

const HeaderAdmin = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const { isOpenSidebar } = useSelector((store) => store.control);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <AppBar
      position="fixed"
      className={`${clsx(classes.appBar, {
        [classes.appBarShift]: isOpenSidebar,
      })} app-admin__app-bar`}
    >
      <Toolbar className="toolbar-header">
        {!isOpenSidebar && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            style={{ marginLeft: "-3px" }}
            onClick={() => dispatch(toggleSidebar())}
            className={`${clsx(classes.menuButton)} btn--menu`}
          >
            <MenuIcon />
          </IconButton>
        )}
        <div
          style={{ marginLeft: isOpenSidebar ? "auto" : "unset" }}
          className="flex"
        >
          <AvatarMenu openModalProfile={() => setOpenProfile(true)} />
        </div>
      </Toolbar>
      {openProfile && (
        <ModalProfileAdmin
          isModalVisible={true}
          close={() => setOpenProfile(false)}
        />
      )}
    </AppBar>
  );
};

export default HeaderAdmin;
