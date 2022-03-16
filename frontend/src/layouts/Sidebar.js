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
import CourseIcon from "assets/icons/sidebarAdmin/online-learning.png";
import CustomerICon from "assets/icons/sidebarAdmin/target.png";
import StatisticsIcon from "assets/icons/sidebarAdmin/statistics.png";
import CertificateIcon from "assets/icons/sidebarAdmin/certificate.png";
import OrderIcon from "assets/icons/sidebarAdmin/form.png";
import VoucherIcon from "assets/icons/sidebarAdmin/voucher.png";
import RecipeIcon from "assets/icons/sidebarAdmin/recipes.png";
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
  CourseIcon,
  RecipeIcon,
  EmployeeIcon,
  CustomerICon,
  CertificateIcon,
  OrderIcon,
  VoucherIcon,
  StatisticsIcon,
];

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpenSidebar } = useSelector((store) => store.control);

  const { information } = useSelector((store) => store.common)?.userDetail;

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
          { name: "Quản lý khóa học", pathName: "/courses" },
          { name: "Quản lý công thức", pathName: "/recipes" },
          { name: "Quản lý nhân viên", pathName: "/employees" },
          { name: "Quán lý khách hàng", pathName: "/customers" },
          { name: "Quản lý chứng nhận", pathName: "/certifications" },
          { name: "Quản lý đơn hàng", pathName: "/orders" },
          { name: "Quản lý vouchers", pathName: "/vouchers" },
          { name: "Thống kê", pathName: "/statistics" },
        ]
          .filter((item) => {
            if (information.roleId === 2) {
              return item;
            } else {
              if (information.roleId === 3) {
                return ![
                  "Quản lý khóa học",
                  "Quản lý công thức",
                  "Quản lý nhân viên",
                  "Quản lý chứng nhận",
                ].includes(item.name);
              } else {
                return ![
                  "Quản lý đơn hàng",
                  "Quán lý khách hàng",
                  "Quản lý nhân viên",
                  "Quản lý vouchers",
                ].includes(item.name);
              }
            }
          })
          .map((text, index) => (
            <ListItem
              onClick={() => history.push("/admin/dashboard" + text.pathName)}
              button
              key={index}
              className={`list--icon ${
                (window.location.pathname.startsWith(
                  "/admin/dashboard" + text.pathName
                ) &&
                  text.pathName !== "") ||
                (text.pathName === "" &&
                  window.location.pathname === "/admin/dashboard")
                  ? "active"
                  : ""
              }`}
            >
              <ListItemIcon>
                <img src={LIST_ICON[index]} alt="" />
              </ListItemIcon>
              <ListItemText
                style={{ marginLeft: "-8px" }}
                primary={text.name}
              />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
