import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageFood";
import InputIcon from "@material-ui/icons/Input";
import PrintIcon from "@material-ui/icons/Print";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FOODS_DATA } from "utils/dummyData";
import ModalCreated from "components/admin/manageFood/modal/ModalCreated";
import { DropdownCommon } from "components/common/dropdown";

const ManageFood = () => {
  const [isOpenModalCreated, setIsOpenModalCreated] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "Quản lý hàng hóa | ECook";
    window.scrollTo(0, 0);
    // fetch data
    setData(FOODS_DATA);
  }, []);
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
                "Thịt heo, bò",
                "Thủy hải sản",
                "Gia cầm",
                "Rau củ, quả",
              ]}
              handleMenuClick={(e) => console.log(e)}
            />
          </div>

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

export default ManageFood;
