import EnhancedTable from "components/admin/manageCustomer/table/EnhancedTable";
import SearchField from "components/common/input/SearchField";
import React, { useEffect } from "react";
import { CUSTOMERS_DATA } from "utils/dummyData";

const ManageCustomer = () => {
  useEffect(() => {
    document.title = "Quản lý khách hàng | ECook";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="manage-customer-container">
      <div className="manage-customer-container--top">
        <SearchField onChange={(e) => console.log(e.target.value)} />
      </div>
      <EnhancedTable data={CUSTOMERS_DATA} />
    </div>
  );
};

export default ManageCustomer;
