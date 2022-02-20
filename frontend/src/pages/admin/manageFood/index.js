import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageFood";
import InputIcon from "@material-ui/icons/Input";
import PrintIcon from "@material-ui/icons/Print";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ModalCreated from "components/admin/manageFood/modal/ModalCreated";
import { DropdownCommon } from "components/common/dropdown";
import { useDispatch } from "react-redux";
import { createFood, getListFoodPerPage } from "redux/actions/food";
import { useSelector } from "react-redux";
import { getFoodType, getFoodTypeId } from "utils/convertUtils";
import { SpinLoading } from "components/common";

const ManageFood = () => {
  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);
  const dispatch = useDispatch();
  const {
    foodList,
    loadingGetListFood,
    createFoodState,
    removeTempFoodState,
    updateFoodState,
  } = useSelector((store) => store.food);
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    typeId: "",
    orderBy: "unitPrice",
    orderType: "asc",
    numOfPerPage: 5,
  });

  useEffect(() => {
    document.title = "Quản lý hàng hóa | ECook";
    window.scrollTo(0, 0);
    // fetch data
    dispatch(getListFoodPerPage(queries));
  }, [queries, dispatch]);

  return (
    <div className="manage-food-page">
      <div className="manage-food-page-top">
        <div className="manage-food-page-top-left">
          <button
            className="btn-admin"
            onClick={() => console.log("connect file to get csv")}
          >
            <InputIcon color="action" />
            Nhập hàng
          </button>
          <button
            className="btn-admin"
            onClick={() => console.log("xuat csv file")}
          >
            <PrintIcon color="action" />
            Xuất hàng
          </button>
        </div>
        <div className="manage-food-page-top-right">
          <div style={{ marginRight: 12 }}>
            <DropdownCommon
              label="Loại hàng"
              options={[
                "Tất cả",
                "Thịt heo, bò",
                "Thủy hải sản",
                "Gia cầm",
                "Rau củ, quả",
              ]}
              selectedItem={getFoodType(queries.typeId)}
              handleMenuClick={(e) => {
                const typeId = Number(e.key);
                setQueries({
                  ...queries,
                  typeId: typeId ? typeId : "",
                });
              }}
            />
          </div>

          <SearchField
            onSubmit={(value) => setQueries({ ...queries, searchText: value })}
          />
          <button
            className="btn-admin"
            onClick={() => setIsOpenModalCreated(true)}
          >
            <AddCircleOutlineIcon color="action" />
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <EnhancedTable
        data={foodList}
        queries={queries}
        setQueries={setQueries}
      />
      <ModalCreated
        isModalVisible={isOpenModalCreated}
        handleSubmit={(formData) => {
          setIsOpenModalCreated(false);
          const requestData = {
            imageFile: formData?.imageFile,
            foodLists: [
              {
                ...formData,
                typeId: getFoodTypeId(formData.type),
              },
            ],
          };
          dispatch(createFood(requestData));
        }}
        close={() => setIsOpenModalCreated(false)}
      />
      {(loadingGetListFood ||
        createFoodState.loading ||
        removeTempFoodState.loading ||
        updateFoodState.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageFood;
