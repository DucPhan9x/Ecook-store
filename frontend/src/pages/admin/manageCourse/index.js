import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageCourse";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCourseByInstructor,
  getListCoursePerPage,
} from "redux/actions/course";
import { SpinLoading } from "components/common";

const ManageCourse = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    loadingGetListCourse,
    createCourseState,
    removeTempCourseState,
    updateCourseState,
    getCourseByIdState,
  } = useSelector((store) => store.course);
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "unitPrice",
    orderType: "asc",
    numOfPerPage: 5,
  });
  const { information } = useSelector((store) => store.common)?.userDetail;

  useEffect(() => {
    // fetch data
    document.title = "Quản lý khóa học | ECook";
    window.scrollTo(0, 0);
    // check roleId to fetch exactly data
    if (information?.roleId === 4) {
      dispatch(getListCourseByInstructor(queries));
    } else {
      if (information?.roleId === 2) dispatch(getListCoursePerPage(queries));
    }
  }, [queries, dispatch, information]);

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
        removeTempCourseState.loading ||
        getCourseByIdState?.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageCourse;
