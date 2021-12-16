import React from "react";
import ProfitIcon from "assets/icons/profit.png";
import AccessUserIcon from "assets/icons/group.png";
import NumberSellCourseIcon from "assets/icons/numberOfCoursesSell.png";
import OrderHandleIcon from "assets/icons/orderHandle.png";
import TabsStatistic from "components/common/TabsStatistic";
import { DropdownCommon } from "components/common/dropdown";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ doanh thu",
      fontSize: 24,
    },
  },
};

const Statistics = () => {
  return (
    <div className="statistic-container">
      <div className="statistic-container__top">
        <div className="statistic-container__top--item turnover">
          <div className="statistic-container__top--item__inner">
            <span>Doanh thu (VND)</span>
            <div>
              <img src={ProfitIcon} alt="" />
              <span>1,000,000,000</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-users">
          <div className="statistic-container__top--item__inner">
            <span>Số lượng người dùng truy cập</span>
            <div>
              <img src={AccessUserIcon} alt="" />
              <span>1,000,000</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-orders">
          <div className="statistic-container__top--item__inner">
            <span>Số đơn hàng đã xử lý</span>
            <div>
              <img src={OrderHandleIcon} alt="" />
              <span>150,000</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-courses-sell">
          <div className="statistic-container__top--item__inner">
            <span>Số khóa học được bán ra</span>
            <div>
              <img src={NumberSellCourseIcon} alt="" />
              <span>190,000</span>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic-container__bottom">
        <div className="statistic-container__bottom-left">
          <DropdownCommon
            label="Bộ lọc"
            options={["Theo tuần", "Theo tháng", "Theo quý", "Theo năm"]}
            handleMenuClick={(e) => console.log(e)}
          />
          <Bar
            style={{ marginTop: 36 }}
            options={options}
            data={{
              labels: [
                "Tháng 1",
                "Tháng 2",
                "Tháng 3",
                "Tháng 4",
                "Tháng 5",
                "Tháng 6",
                "Tháng 7",
                "Tháng 8",
                "Tháng 9",
                "Tháng 10",
                "Tháng 11",
                "Tháng 12",
              ],
              datasets: [
                {
                  data: [
                    25000000, 100000000, 900000000, 100000000, 700000000,
                    1000000000, 450000000, 250000000, 200000000, 540000000,
                    100000000, 1000000000,
                  ],
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
        <div className="statistic-container__bottom-right">
          <TabsStatistic />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
