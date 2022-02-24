import { Grid } from "@material-ui/core";
import MyCourseCard from "components/common/card/MyCourseCard";
import React, { useEffect } from "react";
import { COURSES_DATA } from "utils/dummyData";

const MyCourses = () => {
  useEffect(() => {
    document.title = "Quản lý khóa học | ECook";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="my-courses-container">
      <Grid container spacing={3} style={{ marginTop: 40 }}>
        {COURSES_DATA.map((c, indx) => (
          <Grid item xs={3} key={c._id}>
            <MyCourseCard data={c} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default MyCourses;
