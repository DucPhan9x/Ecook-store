import React, { useState } from "react";
import { EnhancedTable } from "components/admin/manageFood";
import InputIcon from "@material-ui/icons/Input";
import PrintIcon from "@material-ui/icons/Print";
import SearchField from "components/common/input/SearchField";
import { DropdownCommon } from "components/common/dropdown";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FOODS_DATA } from "utils/dummyData";
import ModalCreated from "components/admin/manageFood/modal/ModalCreated";

const ManageFood = () => {
  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);
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
          <DropdownCommon
            label="Sắp xếp"
            options={["Mới nhất", "Cũ nhất"]}
            handleMenuClick={(e) => console.log(e)}
          />
          <SearchField onChange={(e) => console.log(e.target.value)} />
          <button
            className="btn-admin"
            onClick={() => setIsOpenModalCreated(true)}
          >
            <AddCircleOutlineIcon color="action" />
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <EnhancedTable data={FOODS_DATA} />
      <ModalCreated
        isModalVisible={isOpenModalCreated}
        handleSubmit={(formData) => {
          setIsOpenModalCreated(false);
          console.log("data: ", formData);
        }}
        close={() => setIsOpenModalCreated(false)}
      />
    </div>
  );
};

export default ManageFood;
