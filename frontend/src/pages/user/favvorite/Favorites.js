import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import GrainIcon from "@material-ui/icons/Grain";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import FoodCard from "components/common/card/FoodCard";
import RecipeCard from "components/common/card/RecipeCard";
import CourseCard from "components/common/card/CourseCard";
import { useEffect } from "react";
import ScrollToTop from "components/common/ScrollToTop";
import { useDispatch } from "react-redux";
import { getListWishlist } from "redux/actions/wishlist";
import { useSelector } from "react-redux";
import { SpinLoading } from "components/common";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    marginRight: theme.spacing(2),
    fontSize: 20,
  },
  icon: {
    marginRight: theme.spacing(1.5),
    width: 22,
    height: 22,
    marginTop: 4,
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [typeView, setTypeView] = useState(1); //1: food, 2: recipe, 3: course
  const dispatch = useDispatch();
  const { getWishlistState, updateWishlistState } = useSelector(
    (store) => store.wishlist
  );
  const { createCartItemsState } = useSelector((store) => store.cart);

  useEffect(() => {
    document.title = "Bộ sưu tập | ECook";
    window.scrollTo(0, 0);

    dispatch(getListWishlist(typeView));
  }, [dispatch, typeView]);

  useEffect(() => {
    setData(getWishlistState.wishlists);
  }, [getWishlistState.wishlists]);

  function handleClick(key) {
    setTypeView(key);
  }

  return (
    <div className="favorites-container">
      {(getWishlistState?.loading ||
        updateWishlistState?.loading ||
        createCartItemsState?.loading) && <SpinLoading />}
      <div className="favorites-container-top">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            color={typeView === 1 ? "secondary" : "inherit"}
            onClick={() => handleClick(1)}
            className={classes.link}
          >
            <FastfoodIcon className={classes.icon} />
            Sản phẩm
          </Link>
          <Link
            color={typeView === 2 ? "secondary" : "inherit"}
            onClick={() => handleClick(2)}
            className={classes.link}
          >
            <WhatshotIcon className={classes.icon} />
            Công thức
          </Link>
          <Link
            color={typeView === 3 ? "secondary" : "inherit"}
            className={classes.link}
            onClick={() => handleClick(3)}
          >
            <GrainIcon className={classes.icon} />
            Khóa học
          </Link>
        </Breadcrumbs>
      </div>
      <div className="favorites-container-bottom">
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item xs={3}>
              {typeView === 1 ? (
                <FoodCard data={item} />
              ) : typeView === 2 ? (
                <RecipeCard data={item} />
              ) : (
                <CourseCard data={item} />
              )}
            </Grid>
          ))}
        </Grid>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Favorites;
