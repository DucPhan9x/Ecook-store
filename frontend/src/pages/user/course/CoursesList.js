import { Grid } from "@material-ui/core";
import { BackPreviousPage, SpinLoading } from "components/common";
import CourseCard from "components/common/card/CourseCard";
import SearchField from "components/common/input/SearchField";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCoursePerPage,
  resetToSearchCourse,
} from "redux/actions/course";

const CoursesList = () => {
  const [queries, setQueries] = useState({
    page: 1,
    searchText: "",
    orderBy: "unitPrice",
    orderType: "asc",
    numOfPerPage: 12,
  });
  const { loadingGetListCourse, courseListClient, isLimited } = useSelector(
    (store) => store.course
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetToSearchCourse());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Danh sách khóa học | ECook";
    window.scrollTo(0, 0);
    dispatch(getListCoursePerPage(queries));
  }, [dispatch, queries]);
  return (
    <div className="recipes-list-container">
      {loadingGetListCourse && <SpinLoading />}
      <div
        className="flex items-center j-space-between"
        style={{ marginBottom: 24 }}
      >
        <BackPreviousPage />
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value, page: 1 });
            dispatch(resetToSearchCourse());
          }}
        />
      </div>
      <Grid container spacing={6} className="recipes-list-container--body">
        {courseListClient?.map((item) => (
          <Grid item xs={3} key={item._id}>
            <CourseCard data={item} />
          </Grid>
        ))}
      </Grid>
      {!isLimited && (
        <div
          className="block__button-see-more"
          onClick={() => setQueries({ ...queries, page: queries.page + 1 })}
        >
          <button className="btn btn-client">Xem thêm</button>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default CoursesList;
