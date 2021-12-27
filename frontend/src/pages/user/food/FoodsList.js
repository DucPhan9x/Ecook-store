import { Grid } from "@material-ui/core";
import { BackPreviousPage } from "components/common";
import FoodCard from "components/common/card/FoodCard";
import SearchField from "components/common/input/SearchField";
import ScrollToTop from "components/common/ScrollToTop";
import React from "react";
import { useEffect } from "react";
import { FOODS_DATA } from "utils/dummyData";

const FoodsList = () => {
  useEffect(() => {
    document.title = "Danh sách sản phẩm | ECook";

    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="recipes-list-container">
      <div
        className="flex items-center j-space-between"
        style={{ marginBottom: 24 }}
      >
        <BackPreviousPage />
        <SearchField onChange={(e) => console.log(e.target.value)} />
      </div>

      <Grid container spacing={6} className="recipes-list-container--body">
        {FOODS_DATA.map((item) => (
          <Grid item xs={3} key={item._id}>
            <FoodCard data={item} />
          </Grid>
        ))}
      </Grid>
      <div className="block__button-see-more">
        <button className="btn btn-client">Xem thêm</button>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default FoodsList;
