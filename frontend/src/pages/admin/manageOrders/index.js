import { EnhancedTable } from "components/admin/manageOrder";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React from "react";
import { ORDERS_DATA } from "utils/dummyData";

const ManageOrders = () => {
  return (
    <div className="manage-orders-container">
      <div className="manage-orders-container-top flex">
        <DropdownCommon
          label="Bộ lọc"
          options={["Chưa giao", "Đã nhận", "Đang giao", "Đã giao"]}
          handleMenuClick={(e) => console.log(e)}
        />
        <SearchField onChange={(e) => console.log(e.target.value)} />
      </div>
      <EnhancedTable data={ORDERS_DATA} />
    </div>
  );
};

export default ManageOrders;
