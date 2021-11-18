import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Logo from "assets/images/adminLogoEcook.png";
import { IconButton } from "@material-ui/core";
import { toggleSidebar } from "redux/actions/control";
import { ArrowLeft } from "@material-ui/icons";
import FoodIcon from "assets/icons/sidebarAdmin/food.png";
import EmployeeIcon from "assets/icons/sidebarAdmin/employee.png";
import InstructorIcon from "assets/icons/sidebarAdmin/chef.png";
import CourseIcon from "assets/icons/sidebarAdmin/online-learning.png";
import CustomerICon from "assets/icons/sidebarAdmin/target.png";
import StatisticsIcon from "assets/icons/sidebarAdmin/statistics.png";
import { useHistory } from "react-router";

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

const LIST_ICON = [
  FoodIcon,
  EmployeeIcon,
  InstructorIcon,
  CourseIcon,
  CustomerICon,
  StatisticsIcon,
];

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
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
          { name: "Quản lý hàng hóa", pathName: "" },
          { name: "Quản lý nhân viên", pathName: "/employees" },
          { name: "Quản lý giáo viên", pathName: "/instructors" },
          { name: "Quản lý khóa học", pathName: "/courses" },
          { name: "Quán lý khách hàng", pathName: "/customers" },
          { name: "Thống kê", pathName: "/statistics" },
        ].map((text, index) => (
          <ListItem
            onClick={() => history.push("/admin/dashboard" + text.pathName)}
            button
            key={index}
            className={`list--icon ${
              window.location.pathname.endsWith(
                "/admin/dashboard" + text.pathName
              )
                ? "active"
                : ""
            }`}
          >
            <ListItemIcon>
              <img src={LIST_ICON[index]} alt="" />
            </ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
