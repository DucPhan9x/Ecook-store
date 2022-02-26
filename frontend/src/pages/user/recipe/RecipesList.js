import { Grid } from "@material-ui/core";
import { BackPreviousPage, SpinLoading } from "components/common";
import RecipeCard from "components/common/card/RecipeCard";
import SearchField from "components/common/input/SearchField";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getListRecipePerPage,
  resetToSearchRecipe,
} from "redux/actions/recipe";

const RecipesList = () => {
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "numOfStars",
    orderType: "asc",
    numOfPerPage: 12,
  });
  const { loadingGetListRecipe, recipeListClient, isLimited } = useSelector(
    (store) => store.recipe
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetToSearchRecipe());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Danh sách công thức | ECook";
    window.scrollTo(0, 0);
    //
    dispatch(getListRecipePerPage(queries));
  }, [dispatch, queries]);

  return (
    <div className="recipes-list-container">
      {loadingGetListRecipe && <SpinLoading />}
      <div
        className="flex items-center j-space-between"
        style={{ marginBottom: 24 }}
      >
        <BackPreviousPage />
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value, page: 1 });
            dispatch(resetToSearchRecipe());
          }}
        />
      </div>

      <Grid container spacing={6} className="recipes-list-container--body">
        {recipeListClient?.map((item) => (
          <Grid item xs={3} key={item._id}>
            <RecipeCard data={item} />
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

export default RecipesList;
