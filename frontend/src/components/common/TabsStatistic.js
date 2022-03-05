import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DevelopIcon from "assets/icons/develop.png";
// import { Rating } from "@material-ui/lab";
import GroupIcon from "@material-ui/icons/Group";
import { Empty } from "antd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
  },
}));

export default function TabsStatistic({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  let { popularFoods, popularCourses } = data;
  // let popularFoods = [];
  // let popularRecipe = [];??????????
  // let popularCourses = [];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Mặt hàng phổ biến" {...a11yProps(0)} />
          {/* <Tab label="Công thức yêu thích" {...a11yProps(1)} /> */}
          <Tab label="Khóa học phổ biến" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        className="body-tabs-statistic"
        style={{ maxHeight: 500 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {popularFoods?.length > 0 ? (
            popularFoods?.map((food, index) => (
              <div key={index} className="item-favorite-block">
                <img
                  style={{ width: 140, height: 140, borderRadius: 12 }}
                  src={food.imageUrl}
                  alt=""
                />
                <span>{food.name}</span>
                <span>
                  Lượt mua: {food.amountOfBuy}
                  <img
                    style={{
                      marginLeft: 4,
                      marginBottom: 8,
                      width: 50,
                      height: 50,
                    }}
                    src={DevelopIcon}
                    alt=""
                  />
                </span>
              </div>
            ))
          ) : (
            <div
              className="center flex-col"
              style={{ color: "gray", fontSize: 20 }}
            >
              Chưa có mặt hàng
              <Empty description={false} style={{ marginTop: 10 }} />
            </div>
          )}
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          {popularRecipe?.length > 0 ? (
            popularRecipe?.map((r, index) => (
              <div key={index} className="item-favorite-block">
                <img
                  style={{ width: 120, height: 120, borderRadius: 12 }}
                  src={r.imageUrl}
                  alt=""
                />
                <span>{r.title}</span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  Lượt đánh giá:{" "}
                  <Rating style={{ marginLeft: 4 }} value={r.feedbacks} />
                </span>
              </div>
            ))
          ) : (
            <div
              className="center flex-col"
              style={{ color: "gray", fontSize: 20 }}
            >
              Chưa có mặt hàng
              <Empty description={false} style={{ marginTop: 10 }} />
            </div>
          )}
        </TabPanel> */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          {popularCourses?.length > 0 ? (
            popularCourses?.map((c, index) => (
              <div key={index} className="item-favorite-block">
                <iframe
                  style={{ width: 300 }}
                  src={c?.videoList[0]?.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  controls
                  title="Embedded youtube"
                />
                {/* <video controls style={{ width: 150, height: 150 }}>
                  <source src={c?.videoList[0]?.videoUrl} />
                </video> */}
                <span>{c.name}</span>
                <span>
                  Số lượng học viên: {c.amountOfBuy}
                  <GroupIcon
                    style={{ marginLeft: 8, marginBottom: 6 }}
                    color="secondary"
                  />
                </span>
              </div>
            ))
          ) : (
            <div
              className="center flex-col"
              style={{ color: "gray", fontSize: 20 }}
            >
              Chưa có mặt hàng
              <Empty description={false} style={{ marginTop: 10 }} />
            </div>
          )}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
