import { Grid } from "@material-ui/core";
import { BackPreviousPage, SpinLoading } from "components/common";
import InstructorCard from "components/common/card/InstructorCard";
import SearchField from "components/common/input/SearchField";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListEmployeePerPage } from "redux/actions/employee";

const InstructorsList = () => {
  const [queries, setQueries] = useState({
    searchText: "",
    employeeType: 4,
  });
  const { loadingGetListEmployee, employeeList } = useSelector(
    (store) => store.employee
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Danh sách chef | ECook";
    window.scrollTo(0, 0);
    dispatch(getListEmployeePerPage(queries));
  }, [dispatch, queries]);

  return (
    <div className="recipes-list-container">
      {loadingGetListEmployee && <SpinLoading />}
      <div
        className="flex items-center j-space-between"
        style={{ marginBottom: 24 }}
      >
        <BackPreviousPage />
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value, page: 1 });
          }}
        />
      </div>

      <Grid container spacing={6} className="recipes-list-container--body">
        {employeeList?.map((item) => (
          <Grid item xs={3} key={item._id}>
            <InstructorCard data={item} />
          </Grid>
        ))}
      </Grid>
      <ScrollToTop />
    </div>
  );
};

export default InstructorsList;
