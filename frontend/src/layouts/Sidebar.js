import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Logo from "assets/images/adminLogoEcook.png";
import { IconButton } from "@material-ui/core";
import { toggleSidebar } from "redux/actions/control";
import { ArrowLeft } from "@material-ui/icons";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpenSidebar } = useSelector((store) => store.control);

  return (
    <Drawer
      variant="permanent"
      className={`${clsx(classes.drawer, {
        [classes.drawerOpen]: isOpenSidebar,
        [classes.drawerClose]: !isOpenSidebar,
      })} sidebar-container`}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpenSidebar,
          [classes.drawerClose]: !isOpenSidebar,
        }),
      }}
    >
      <div className="header-sidebar">
        <img src={Logo} alt="Logo" />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          className={`${clsx(classes.menuButton)} btn--menu`}
        >
          <ArrowLeft />
        </IconButton>
      </div>
      <List>
        {[
          "Quản lý hàng hóa",
          "Quản lý nhân viên",
          "Quản lý giáo viên",
          "Quản lý khóa học",
          "Quán lý khách hàng",
          "Thống kê",
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
