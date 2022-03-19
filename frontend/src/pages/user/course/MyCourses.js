import { Grid } from "@material-ui/core";
import { SpinLoading } from "components/common";
import MyCourseCard from "components/common/card/MyCourseCard";
import SearchField from "components/common/input/SearchField";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCourseByClient } from "redux/actions/course";

const MyCourses = () => {
  const dispatch = useDispatch();
  const [queries, setQueries] = useState({
    searchText: "",
    isFinish: false,
  });

  useEffect(() => {
    document.title = "Quản lý khóa học | ECook";
    window.scrollTo(0, 0);

    dispatch(getListCourseByClient(queries));
  }, [dispatch, queries]);

  const { loadingGetListCourse, courseList } = useSelector(
    (store) => store.course
  );

  return (
    <div className="my-courses-container">
      {loadingGetListCourse && <SpinLoading />}
      <div
        style={{ marginTop: 20 }}
        className="flex j-space-between items-center"
      >
        {/* <DropdownCommon
          label="Bộ lọc"
          selectedItem={
            ["Đã hoàn thành khóa học", "Chưa hoàn thành"][
              !queries.isFinish ? 1 : 0
            ]
          }
          options={["Đã hoàn thành khóa học", "Chưa hoàn thành"]}
          handleMenuClick={(e) =>
            setQueries({
              ...queries,
              isFinish: Number(e.key) === 0,
            })
          }
        /> */}
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value });
          }}
        />
      </div>
      {courseList?.length > 0 ? (
        <Grid container spacing={3} style={{ marginTop: 40 }}>
          {courseList?.map((c, indx) => (
            <Grid item xs={3} key={c._id}>
              <MyCourseCard data={c} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          className="center"
          style={{ fontSize: 28, color: "gray", marginTop: 40, opacity: 0.8 }}
        >
          Bạn chưa có khóa học nào cả!
        </div>
      )}
    </div>
  );
};
export default MyCourses;
