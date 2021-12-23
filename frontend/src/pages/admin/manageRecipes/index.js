import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageRecipe";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { RECIPES_DATA } from "utils/dummyData";
import { useHistory } from "react-router";
import { ROUTE_ADMIN_DASHBOARD_RECIPES_ADD } from "utils/routes";

const ManageRecipes = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // fetch data
    setData(RECIPES_DATA);
  }, []);
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

          <SearchField onChange={(e) => console.log(e.target.value)} />
        </div>
      </div>
      <EnhancedTable data={data} setData={setData} />
    </div>
  );
};

export default ManageRecipes;
