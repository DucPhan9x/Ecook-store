import { EnhancedTable } from "components/admin/manageOrder";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersByAdministrator } from "redux/actions/order";

const OPTION_FILTER = [
  "Tất cả",
  "Đang chờ xác nhận",
  "Đang chuẩn bị",
  "Đang giao hàng",
  "Đã giao hàng",
  // "Đã hủy",
];

const ManageOrders = () => {
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "createAt",
    orderType: "asc",
    numOfPerPage: 5,
    statusId: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Quản lý đơn hàng | ECook";
    window.scrollTo(0, 0);
    dispatch(getAllOrdersByAdministrator(queries));
  }, [queries, dispatch]);

  return (
    <div className="manage-orders-container">
      <div className="manage-orders-container-top flex">
        <DropdownCommon
          label={OPTION_FILTER[queries.statusId]}
          selectedItem={OPTION_FILTER[queries.statusId]}
          options={OPTION_FILTER}
          handleMenuClick={(e) => {
            setQueries({ ...queries, statusId: Number(e.key), page: 1 });
          }}
        />
        <SearchField
          onSubmit={(value) =>
            setQueries({ ...queries, searchText: value, page: 1 })
          }
        />
      </div>
      <EnhancedTable queries={queries} setQueries={setQueries} />
    </div>
  );
};

export default ManageOrders;
