import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageRecipe";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router";
import { ROUTE_ADMIN_DASHBOARD_RECIPES_ADD } from "utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  getListRecipeByInstructor,
  getListRecipePerPage,
} from "redux/actions/recipe";
import { SpinLoading } from "components/common";

const ManageRecipes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { information } = useSelector((store) => store.common)?.userDetail;
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "numOfStars",
    orderType: "asc",
    numOfPerPage: 5,
  });
  const {
    loadingGetListRecipe,
    createRecipeState,
    removeTempRecipeState,
    updateRecipeState,
    getRecipeByIdState,
  } = useSelector((store) => store.recipe);

  useEffect(() => {
    // fetch data
    document.title = "Quản lý công thức | ECook";
    window.scrollTo(0, 0);
    if (information?.roleId === 4) {
      dispatch(getListRecipeByInstructor(queries));
    } else {
      if (information?.roleId === 2) dispatch(getListRecipePerPage(queries));
    }
  }, [information, queries, dispatch]);
  return (
    <div className="manage-food-page">
      <div className="manage-food-page-top">
        <div className="manage-food-page-top-right flex j-space-between full-width">
          <div className="flex items-center">
            <button
              className="btn-admin"
              onClick={() => history.push(ROUTE_ADMIN_DASHBOARD_RECIPES_ADD)}
            >
              <AddCircleOutlineIcon color="action" />
              Tạo mới
            </button>
          </div>
          <SearchField
            onSubmit={(value) =>
              setQueries({ ...queries, searchText: value, page: 1 })
            }
          />
        </div>
      </div>
      <EnhancedTable queries={queries} setQueries={setQueries} />
      {(loadingGetListRecipe ||
        createRecipeState.loading ||
        updateRecipeState.loading ||
        removeTempRecipeState.loading ||
        getRecipeByIdState?.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageRecipes;
