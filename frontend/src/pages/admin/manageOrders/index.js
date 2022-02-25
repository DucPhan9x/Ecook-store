import { EnhancedTable } from "components/admin/manageOrder";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React, { useEffect } from "react";
import { useState } from "react";
import { ORDERS_DATA } from "utils/dummyData";

const ManageOrders = () => {
  const [queries, setQueries] = useState({
    statusId: 1,
  });
  useEffect(() => {
    document.title = "Quản lý đơn hàng | ECook";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="manage-orders-container">
      <div className="manage-orders-container-top flex">
        <DropdownCommon
          label="Bộ lọc"
          options={[
            "Đang chờ xác nhận",
            "Đang chuẩn bị",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
          ]}
          handleMenuClick={(e) =>
            setQueries({ ...queries, statusId: Number(e.key) + 1 })
          }
          selectedItem={[
            "Đang chờ xác nhận",
            "Đang chuẩn bị",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
          ].find((item, idx) => idx + 1 === queries.statusId)}
        />
        <SearchField
          onSubmit={(value) =>
            setQueries({ ...queries, searchText: value, page: 1 })
          }
        />
      </div>
      <EnhancedTable data={ORDERS_DATA} />
    </div>
  );
};

export default ManageOrders;
