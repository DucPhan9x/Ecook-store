import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageRecipe";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { RECIPES_DATA } from "utils/dummyData";
import ModalCreated from "components/admin/manageRecipe/modal/ModalCreated";

const ManageRecipes = () => {
  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch data
    setData(RECIPES_DATA);
  }, []);
  return (
    <div className="manage-food-page">
      <div className="manage-food-page-top">
        <div className="manage-food-page-top-right flex j-space-between full-width">
          <button
            className="btn-admin"
            onClick={() => setIsOpenModalCreated(true)}
          >
            <AddCircleOutlineIcon color="action" />
            Tạo mới
          </button>
          <SearchField onChange={(e) => console.log(e.target.value)} />
        </div>
      </div>
      <EnhancedTable data={data} setData={setData} />
      <ModalCreated
        isModalVisible={isOpenModalCreated}
        handleSubmit={(formData) => {
          setIsOpenModalCreated(false);
          // add formData into data ,setData
          console.log("data: ", formData);
        }}
        close={() => setIsOpenModalCreated(false)}
      />
    </div>
  );
};

export default ManageRecipes;
