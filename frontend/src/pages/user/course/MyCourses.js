import { Grid } from "@material-ui/core";
import MyCourseCard from "components/common/card/MyCourseCard";
import SearchField from "components/common/input/SearchField";
import React from "react";
import { COURSES_DATA } from "utils/dummyData";

const MyCourses = () => {
  return (
    <div className="my-courses-container">
      <SearchField onChange={(e) => console.log(e.target.value)} />
      <Grid container spacing={3}>
        {COURSES_DATA.map((c, indx) => (
          <Grid item xs={3} key={c._id}>
            <MyCourseCard data={c} />
          </Grid>
        ))}
      </Grid>
      <div className="full-width center">
        <button className="btn btn-client btn-see-more">Xem thêm</button>
      </div>
    </div>
  );
};
export default MyCourses;
