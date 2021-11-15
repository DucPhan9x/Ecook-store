import React, { useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Tooltip } from "antd";
import MultipleSelect from "components/common/MultipleSelect";
import { RECIPES_DATA } from "utils/dummyData";
import RecipeCard from "components/common/RecipeCard";

const HomePageClient = () => {
  useEffect(() => {
    document.title = "Trang chủ | ECook";
  }, []);
  return (
    <div className="homepage-user">
      <div className="homepage-user--section-1" />
      <div className="homepage-user--section-2">
        <div className="block-action-switch">
          <MultipleSelect />
          <div className="block-action-switch--item">
            <span>Bạn muốn xem gì?</span>
            <Tooltip title="Công thức và sản phẩm">
              <FastfoodIcon className="icon--food" />
            </Tooltip>
            <Tooltip title="Khóa học nấu ăn">
              <AssignmentIcon className="icon--course" />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="homepage-user--section-3">
        <div className="block--product-list">
          <div className="block--product-list--title">
            <span>Công thức hiện có</span>
            <span>Xem thêm</span>
          </div>
          <div className="block--product-list--showing">
            {RECIPES_DATA.map((r) => (
              <RecipeCard data={r} key={r.id} />
            ))}
          </div>
        </div>

        <div className="block--product-list">
          <div className="block--product-list--title">
            <span>Các mặt hàng hiện có</span>
            <span>Xem thêm</span>
          </div>

          <div className="block--product-list--showing">
            <div>
              <span>Thịt bò, thịt heo</span>
              <div></div>
            </div>
            <div>
              <span>Gà, vịt</span>
              <div></div>
            </div>
            <div>
              <span>Thủy hải sản</span>
              <div></div>
            </div>
            <div>
              <span>Rau củ quả</span>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="homepage-user--section-3">
        <div className="block--product-list">
          <div className="block--product-list--title">
            <span> Khóa học nấu ăn hiện có</span>
            <span>Xem thêm</span>
          </div>
          <div className="block--product-list--showing"></div>
        </div>

        <div className="block--product-list">
          <div className="block--product-list--title">
            <span>Người hướng dẫn</span>
            <span>Xem thêm</span>
          </div>
          <div className="block--product-list--showing"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
