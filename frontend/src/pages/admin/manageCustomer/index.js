import EnhancedTable from "components/admin/manageCustomer/table/EnhancedTable";
import { SpinLoading } from "components/common";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCustomerPerPage } from "redux/actions/customer";

const ManageCustomer = () => {
  const dispatch = useDispatch();
  const { loadingGetListCustomer, banUnBanCustomers } = useSelector(
    (store) => store.customer
  );
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "userId",
    orderType: "asc",
    numOfPerPage: 5,
  });

  useEffect(() => {
    document.title = "Quản lý khách hàng | ECook";
    window.scrollTo(0, 0);

    dispatch(getListCustomerPerPage(queries));
  }, [dispatch, queries]);
  return (
    <div className="manage-customer-container">
      <div className="manage-customer-container--top">
        <SearchField
          onSubmit={(value) =>
            setQueries({ ...queries, searchText: value, page: 1 })
          }
        />
      </div>
      <EnhancedTable queries={queries} setQueries={setQueries} />
      {(loadingGetListCustomer || banUnBanCustomers.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageCustomer;
