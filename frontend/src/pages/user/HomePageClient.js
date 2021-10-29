import React, { useEffect } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { Tooltip } from "antd";

const HomePageClient = () => {
  useEffect(() => {
    document.title = "Trang chủ | ECook";
  }, []);
  return (
    <div className="homepage-user">
      <div className="homepage-user--section-1" />
      <div className="homepage-user--section-2">
        <div className="block-action-switch">
          <span>Bạn muốn xem gì?</span>
          <Tooltip title="Công thức và sản phẩm">
            <FastfoodIcon className="icon--food" />
          </Tooltip>
          <Tooltip title="Khóa học nấu ăn">
            <AssignmentIcon className="icon--course" />
          </Tooltip>
        </div>
      </div>
      <div className="homepage-user--section-3">
        <div>
          <span>Công thức hiện có</span>
          <div></div>
        </div>
        <div>
          <span>Các mặt hàng hiện có</span>
          <div>
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
        <div>
          <span>Khóa học nấu ăn hiện có</span>
          <div></div>
        </div>
        <div>
          <span>Người hướng dẫn</span>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
