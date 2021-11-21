import React, { useEffect, useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Tooltip } from "antd";
import {
  RECIPES_DATA,
  FOODS_DATA,
  COURSES_DATA,
  INSTRUCTORS_DATA,
} from "utils/dummyData";
import RecipeCard from "components/common/card/RecipeCard";
import FoodCard from "components/common/card/FoodCard";
import CourseCard from "components/common/card/CourseCard";
import InstructorCard from "components/common/card/InstructorCard";

const HomePageClient = () => {
  const [isFoodShow, setIsFoodShow] = useState(true);

  useEffect(() => {
    document.title = "Trang chủ | ECook";
  }, []);
  return (
    <div className="homepage-user">
      <div className="homepage-user--section-1" />
      <div className="homepage-user--section-2">
        <div className="block-action-switch">
          <div className="block-action-switch--item">
            <span>Bạn muốn xem gì?</span>
            <Tooltip title="Công thức và sản phẩm">
              <FastfoodIcon
                className="icon--food"
                onClick={() => setIsFoodShow(true)}
              />
            </Tooltip>
            <Tooltip title="Khóa học nấu ăn">
              <AssignmentIcon
                className="icon--course"
                onClick={() => setIsFoodShow(false)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {isFoodShow ? (
        <div className="homepage-user--section-3">
          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Công thức hiện có</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {RECIPES_DATA.map((r) => (
                <RecipeCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="label-available-foods">
            <h3 className="mh">Mặt hàng</h3>
            <h3 className="hc">hiện có</h3>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Thịt bò, thịt heo</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {FOODS_DATA.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Gà, vịt</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {FOODS_DATA.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Thủy hải sản</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {FOODS_DATA.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Rau củ quả</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {FOODS_DATA.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="homepage-user--section-3">
          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Khóa học nấu ăn hiện có</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {COURSES_DATA.map((r) => (
                <CourseCard data={r} key={r._id} />
              ))}
            </div>
          </div>
          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Người hướng dẫn</span>
              <span>Xem thêm</span>
            </div>
            <div className="block--product-list--showing">
              {INSTRUCTORS_DATA.map((r) => (
                <InstructorCard data={r} key={r._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageClient;
