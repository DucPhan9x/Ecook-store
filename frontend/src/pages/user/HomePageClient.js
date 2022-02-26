import React, { useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Tooltip } from "antd";
import RecipeCard from "components/common/card/RecipeCard";
import FoodCard from "components/common/card/FoodCard";
import CourseCard from "components/common/card/CourseCard";
import InstructorCard from "components/common/card/InstructorCard";
import ScrollToTop from "components/common/ScrollToTop";
import { useHistory } from "react-router-dom";
import {
  ROUTE_CLIENT_COURSES_LIST,
  ROUTE_CLIENT_FOODS_LIST,
  ROUTE_CLIENT_INSTRUCTORS_LIST,
  ROUTE_CLIENT_RECIPES_LIST,
} from "utils/routes";
import { setScreenView } from "redux/actions/control";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import homeClientAPI from "api/homeClientAPI";
import { useState } from "react";
import { SpinLoading } from "components/common";

const HomePageClient = () => {
  const history = useHistory();
  const { screenView } = useSelector((store) => store.control);
  const [loading1, setLoading1] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    recipes: [],
    meats: [],
    poultries: [],
    seaFoods: [],
    vegetables: [],
  });

  useEffect(() => {
    document.title = "Trang chủ | ECook";
    window.scrollTo(0, 0);
    if (screenView === "food_recipe") {
      setLoading1(true);

      homeClientAPI
        .getListFoodAndRecipe()
        .then((r) => r.json())
        .then((res) => {
          setLoading1(false);
          const { recipes, meats, poultries, seaFoods, vegetables } = res;
          setData({
            recipes,
            meats,
            poultries,
            seaFoods,
            vegetables,
          });
        });
    } else {
      setLoading1(true);

      homeClientAPI
        .getListCourseAndInstructor()
        .then((r) => r.json())
        .then((res) => {
          setLoading1(false);
          const { courses, instructors } = res;
          setData({
            courses,
            instructors,
          });
        });
    }
  }, [screenView]);
  return (
    <div className="homepage-user">
      {loading1 && <SpinLoading />}
      <div className="homepage-user--section-1" />
      <div className="homepage-user--section-2">
        <div className="block-action-switch">
          <div className="block-action-switch--item">
            <span style={{ fontSize: 18 }}>Bạn muốn xem gì?</span>
            <Tooltip title="Công thức và sản phẩm">
              <FastfoodIcon
                className="icon--food"
                onClick={() => {
                  dispatch(setScreenView("food_recipe"));
                }}
              />
            </Tooltip>
            <Tooltip title="Khóa học nấu ăn">
              <AssignmentIcon
                className="icon--course"
                onClick={() => dispatch(setScreenView("course_instructor"))}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {screenView === "food_recipe" ? (
        <div className="homepage-user--section-3">
          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Công thức hiện có</span>
              <span onClick={() => history.push(ROUTE_CLIENT_RECIPES_LIST)}>
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.recipes?.map((r) => (
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
              <span>Thịt</span>
              <span
                onClick={() =>
                  history.push({
                    pathname: ROUTE_CLIENT_FOODS_LIST,
                    state: { typeId: 1 },
                  })
                }
              >
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.meats?.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Gia cầm</span>
              <span
                onClick={() =>
                  history.push({
                    pathname: ROUTE_CLIENT_FOODS_LIST,
                    state: { typeId: 3 },
                  })
                }
              >
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.poultries?.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Thủy hải sản</span>
              <span
                onClick={() =>
                  history.push({
                    pathname: ROUTE_CLIENT_FOODS_LIST,
                    state: { typeId: 2 },
                  })
                }
              >
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.seaFoods?.map((r) => (
                <FoodCard data={r} key={r._id} />
              ))}
            </div>
          </div>

          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Rau củ quả</span>
              <span
                onClick={() =>
                  history.push({
                    pathname: ROUTE_CLIENT_FOODS_LIST,
                    state: { typeId: 4 },
                  })
                }
              >
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.vegetables?.map((r) => (
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
              <span onClick={() => history.push(ROUTE_CLIENT_COURSES_LIST)}>
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.courses?.map((r) => (
                <CourseCard data={r} key={r._id} />
              ))}
            </div>
          </div>
          <div className="block--product-list">
            <div className="block--product-list--title">
              <span>Các chef hiện có</span>
              <span onClick={() => history.push(ROUTE_CLIENT_INSTRUCTORS_LIST)}>
                Xem thêm
              </span>
            </div>
            <div className="block--product-list--showing">
              {data?.instructors?.map((r) => (
                <InstructorCard data={r} key={r._id} />
              ))}
            </div>
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default HomePageClient;
