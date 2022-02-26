import { Grid } from "@material-ui/core";
import { BackPreviousPage, SpinLoading } from "components/common";
import FoodCard from "components/common/card/FoodCard";
import SearchField from "components/common/input/SearchField";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFoodPerPage, resetToSearchFood } from "redux/actions/food";

const FoodsList = () => {
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "unitPrice",
    orderType: "asc",
    numOfPerPage: 12,
    typeId: 0,
  });
  const { loadingGetListFood, foodListClient, isLimited } = useSelector(
    (store) => store.food
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetToSearchFood());
  }, [dispatch]);
  useEffect(() => {
    document.title = "Danh sách sản phẩm | ECook";
    window.scrollTo(0, 0);
    dispatch(
      getListFoodPerPage({
        ...queries,
        typeId: window.history.state.state.typeId || 0,
      })
    );
  }, [dispatch, queries]);
  return (
    <div className="recipes-list-container">
      {loadingGetListFood && <SpinLoading />}
      <div
        className="flex items-center j-space-between"
        style={{ marginBottom: 24 }}
      >
        <BackPreviousPage />
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value, page: 1 });
            dispatch(resetToSearchFood());
          }}
        />
      </div>

      <Grid container spacing={6} className="recipes-list-container--body">
        {foodListClient?.map((item) => (
          <Grid item xs={3} key={item._id}>
            <FoodCard data={item} />
          </Grid>
        ))}
      </Grid>
      {!isLimited && (
        <div
          className="block__button-see-more"
          onClick={() => setQueries({ ...queries, page: queries.page + 1 })}
        >
          <button className="btn btn-client">Xem thêm</button>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default FoodsList;
