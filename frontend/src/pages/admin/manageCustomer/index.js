import EnhancedTable from "components/admin/manageCustomer/table/EnhancedTable";
import SearchField from "components/common/input/SearchField";
import React from "react";
import { CUSTOMERS_DATA } from "utils/dummyData";

const ManageCustomer = () => {
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
