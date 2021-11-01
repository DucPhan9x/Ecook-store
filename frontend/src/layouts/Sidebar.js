import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Logo from "assets/images/adminLogoEcook.png";

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
      </div>
      <List>
        {[
          "Quan ly mat hang",
          "Quan ly nhan vien",
          "Quan ly giao vien",
          "Quan ly khoa hoc",
          "Quan ly khach hang",
          "Thong ke",
        ].map((text, index) => (
          <ListItem button key={text}>
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
