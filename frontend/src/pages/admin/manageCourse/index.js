import React, { useEffect, useState } from "react";
import { EnhancedTable } from "components/admin/manageCourse";
import SearchField from "components/common/input/SearchField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { COURSES_DATA } from "utils/dummyData";
import { useHistory } from "react-router";

const ManageCourse = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // fetch data
    setData(COURSES_DATA);
  }, []);
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

          <SearchField onChange={(e) => console.log(e.target.value)} />
        </div>
      </div>
      <EnhancedTable data={data} setData={setData} />
    </div>
  );
};

export default ManageCourse;
