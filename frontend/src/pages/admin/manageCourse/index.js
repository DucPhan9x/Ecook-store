import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageCourse";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getListCoursePerPage } from "redux/actions/course";
import { SpinLoading } from "components/common";

const ManageCourse = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    loadingGetListCourse,
    createCourseState,
    removeTempCourseState,
    updateCourseState,
  } = useSelector((store) => store.course);
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "unitPrice",
    orderType: "asc",
    numOfPerPage: 5,
  });

  useEffect(() => {
    // fetch data
    dispatch(getListCoursePerPage(queries));
  }, [queries, dispatch]);
  return (
    <div className="manage-food-page">
      <div className="manage-food-page-top">
        <div className="manage-food-page-top-right full-width flex j-space-between">
          <div className="flex items-center">
            <button
              className="btn-admin"
              onClick={() => history.push("/admin/dashboard/courses/add")}
            >
              <AddCircleOutlineIcon color="action" />
              Tạo khóa học
            </button>
          </div>

          <SearchField
            onSubmit={(value) =>
              setQueries({ ...queries, searchText: value, page: 1 })
            }
          />
        </div>
      </div>
      <EnhancedTable queries={queries} setQueries={setQueries} />
      {(loadingGetListCourse ||
        createCourseState.loading ||
        updateCourseState.loading ||
        removeTempCourseState.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageCourse;
