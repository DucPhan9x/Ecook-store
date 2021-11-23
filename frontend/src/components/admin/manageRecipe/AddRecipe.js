import { Paper } from "@material-ui/core";
import { BackPreviousPage } from "components/common";
import React from "react";

const AddRecipe = () => {
  return (
    <div className="add-edit-recipe-container">
      <div className="add-edit-recipe-container-top">
        <BackPreviousPage />
        <button className="btn-admin">Tạo mới</button>
      </div>
      <div className="add-edit-recipe-container-bottom">
        <Paper className="add-edit-recipe-container-bottom--left">
          <input type="file" />
        </Paper>
        <Paper className="add-edit-recipe-container-bottom--right">
          Information
        </Paper>
      </div>
    </div>
  );
};
export default AddRecipe;
