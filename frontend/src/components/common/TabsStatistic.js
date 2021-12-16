import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { COURSES_DATA, FOODS_DATA, RECIPES_DATA } from "utils/dummyData";
import DevelopIcon from "assets/icons/develop.png";
import { Rating } from "@material-ui/lab";
import GroupIcon from "@material-ui/icons/Group";

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

export default function TabsStatistic() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
          <Tab label="Công thức yêu thích" {...a11yProps(1)} />
          <Tab label="Khóa học phổ biến" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        className="body-tabs-statistic"
        style={{ maxHeight: 600 }}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {FOODS_DATA.map((food, index) => (
            <div key={index} className="item-favorite-block">
              <img
                style={{ width: 120, height: 120, borderRadius: 12 }}
                src={food.imageUrl}
                alt=""
              />
              <span>{food.name}</span>
              <span>
                Lượt mua: {food.numOfFeedbacks}
                <img
                  style={{
                    marginLeft: 4,
                    marginBottom: 8,
                    width: 44,
                    height: 44,
                  }}
                  src={DevelopIcon}
                  alt=""
                />
              </span>
            </div>
          ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {RECIPES_DATA.map((r, index) => (
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
          ))}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {COURSES_DATA.map((c, index) => (
            <div key={index} className="item-favorite-block">
              <video controls style={{ width: 150, height: 150 }}>
                <source src={c.videoUrls[0].videoUrl} />
              </video>
              <span>{c.name}</span>
              <span>
                Số lượng học viên: {c.amountStudent}
                <GroupIcon
                  style={{ marginLeft: 8, marginBottom: 6 }}
                  color="secondary"
                />
              </span>
            </div>
          ))}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
