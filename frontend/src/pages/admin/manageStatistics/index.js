import React, { useEffect } from "react";
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
import { getFilterRevenues } from "utils/convertUtils";
import { useState } from "react";
import { SpinLoading } from "components/common";
import { useDispatch } from "react-redux";
import statisticAPI from "api/statisticAPI";
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
  const [filter, setFilter] = useState(0);
  const [revenuesLoading, setRevenuesLoading] = useState(true);
  const [generalLoading, setGeneralLoading] = useState(true);
  const [revenuesData, setRevenuesData] = useState({
    labels: [],
    datasets: [],
  });
  const [generalData, setGeneralData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Thống kế doanh thu | ECook";
    window.scrollTo(0, 0);
    // fetch data
    setRevenuesLoading(true);
    statisticAPI
      .getRevenuesInfo(filter)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setRevenuesData({ labels: res.labels, datasets: res.datasets });
          setRevenuesLoading(false);
        } else {
          setRevenuesLoading(false);
        }
      });

    setGeneralLoading(true);
    statisticAPI
      .getGeneralInfo()
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setGeneralData(res);
          setGeneralLoading(false);
        }
      });
  }, [dispatch, filter]);

  return (
    <div className="statistic-container">
      {(revenuesLoading || generalLoading) && <SpinLoading />}
      <div className="statistic-container__top">
        <div className="statistic-container__top--item turnover">
          <div className="statistic-container__top--item__inner">
            <span className="bold">Doanh thu (VND)</span>
            <div>
              <img src={ProfitIcon} alt="" />
              <span>{generalData?.totalRevenues?.toLocaleString("en")}</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-users">
          <div className="statistic-container__top--item__inner">
            <span className="bold">Số lượng người dùng truy cập</span>
            <div>
              <img src={AccessUserIcon} alt="" />
              <span>{generalData?.totalCustomers}</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-orders">
          <div className="statistic-container__top--item__inner">
            <span className="bold">Số đơn hàng đã xử lý</span>
            <div>
              <img src={OrderHandleIcon} alt="" />
              <span>{generalData?.totalOrders}</span>
            </div>
          </div>
        </div>
        <div className="statistic-container__top--item number-courses-sell">
          <div className="statistic-container__top--item__inner">
            <span className="bold">Số khóa học được bán ra</span>
            <div>
              <img src={NumberSellCourseIcon} alt="" />
              <span>{generalData?.totalCourses}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="statistic-container__bottom">
        <div className="statistic-container__bottom-right">
          <TabsStatistic data={generalData || []} />
        </div>
        <div className="statistic-container__bottom-left">
          <DropdownCommon
            label={getFilterRevenues(filter)}
            options={["Theo tuần", "Theo tháng", "Theo quý", "Theo năm"]}
            selectedItem={getFilterRevenues(filter)}
            handleMenuClick={(e) => setFilter(Number(e.key))}
          />
          <Bar
            style={{ marginTop: 36 }}
            options={options}
            data={{
              labels: revenuesData?.labels,
              datasets: [
                {
                  data: revenuesData?.datasets,
                  backgroundColor: "blue",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
