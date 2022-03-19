import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageFood";
// import InputIcon from "@material-ui/icons/Input";
import PrintIcon from "@material-ui/icons/Print";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ModalCreated from "components/admin/manageFood/modal/ModalCreated";
import { DropdownCommon } from "components/common/dropdown";
import { useDispatch } from "react-redux";
import {
  createFood,
  exportCSVFoodList,
  getListFoodPerPage,
} from "redux/actions/food";
import { useSelector } from "react-redux";
import { getFoodType, getFoodTypeId } from "utils/convertUtils";
import { SpinLoading } from "components/common";
import moment from "moment";

const ManageFood = () => {
  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);
  const dispatch = useDispatch();
  const {
    loadingGetListFood,
    createFoodState,
    removeTempFoodState,
    updateFoodState,
    totalRows,
    getFoodByIdState,
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
  const [loading, setLoading] = useState(false);

  const handleExportCSV = () => {
    setLoading(true);
    dispatch(
      exportCSVFoodList({ ...queries, numOfPerPage: totalRows }, (res) => {
        if (res.status === 200) {
          setLoading(false);

          let csv =
            "ID,Tên,Loại,Giá cả,Lượt đánh giá,Ngày nhập hàng,Trạng thái mặt hàng\n";
          let temp = [];
          temp = res?.foods?.map((data) => ({
            ID: data?._id || "",
            Tên: data?.name || "",
            Loại: getFoodType(data?.typeId) || "",
            "Giá cả": data?.unitPrice + "(" + data?.unit + ")" || "",
            "Lượt đánh giá": data?.numOfStars + "*",
            "Ngày nhập hàng": moment(data?.createAt).format("DD/MM/YYYY"),
            "Trạng thái mặt hàng": data?.isRemoveTemp ? "Hết hàng" : "Còn hàng",
          }));
          temp.forEach(function (row) {
            csv += Object.keys(row)
              .map((key) => '"' + row[key] + '"')
              .join(",");
            csv += "\n";
          });

          let hiddenElement = document.createElement("a");
          hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
          hiddenElement.target = "_blank";
          hiddenElement.download = "FoodList.csv";
          hiddenElement.click();
        } else {
          setLoading(false);
        }
      })
    );
  };

  return (
    <div className="manage-food-page">
      <div className="manage-food-page-top">
        <div className="manage-food-page-top-left">
          {/* <button
            className="btn-admin"
            onClick={() => console.log("connect file to get csv")}
          >
            <InputIcon color="action" />
            Nhập hàng
          </button> */}
          <button className="btn-admin" onClick={handleExportCSV}>
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
                  page: 1,
                });
              }}
            />
          </div>

          <SearchField
            onSubmit={(value) =>
              setQueries({ ...queries, searchText: value, page: 1 })
            }
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
      <EnhancedTable queries={queries} setQueries={setQueries} />
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
        updateFoodState.loading ||
        getFoodByIdState?.loading ||
        loading) && <SpinLoading />}
    </div>
  );
};

export default ManageFood;
