import { Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ORDERS_DATA } from "utils/dummyData";
import { formatCurrency } from "utils/priceUtils";
import ModalDetailOrder from "./ModalDetailOrder";

import { IconButton } from "@material-ui/core";
import { PopoverStickOnHover } from "components/common";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import EmptyOrder from "assets/images/empty-order.png";

const OPTION_FILTER = [
  "Tất cả",
  "Đang chờ xác nhận",
  "Đang chuẩn bị",
  "Đang giao hàng",
  "Đã giao hàng",
  "Đã hủy",
];

const RowContent = ({ row, index }) => {
  const { address, _id, employee, total, paymentMethod, createAt, deliveryAt } =
    row;
  const [itemSelected, setItemSelected] = useState("");

  return (
    <tr className="my-orders-container--content__inner-row-content">
      <td>{index + 1}</td>
      <td
        style={{
          maxWidth: 140,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {_id}
      </td>
      <td>
        <span>{moment(createAt).format("HH:mm:ss [] DD/MM/YYYY")}</span>
      </td>
      <td>
        <span>{moment(deliveryAt).format("HH:mm:ss [] DD/MM/YYYY")}</span>
      </td>
      <td
        style={{
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {address}
      </td>
      <td style={{ width: 120 }}>{paymentMethod}</td>
      <td style={{ width: 150 }}>
        <span>{employee?.name}</span>
        <PopoverStickOnHover
          component={
            <div className="popover-show-info-student-container">
              <div className="popover-show-info-student-container--item">
                <PhoneAndroidIcon />
                <span>{employee?.phoneNumber}</span>
              </div>
              <div className="popover-show-info-student-container--item">
                <MailOutlineIcon />
                <span>{employee?.email}</span>
              </div>
            </div>
          }
          placement="top"
          onMouseEnter={() => {}}
          delay={200}
        >
          <IconButton>
            <InfoOutlinedIcon
              color="secondary"
              className="infor-icon-show-student"
            />
          </IconButton>
        </PopoverStickOnHover>
      </td>
      <td>{formatCurrency(total)}</td>
      <td style={{ width: 220 }}>
        <button
          className="btn btn-client btn--detail"
          onClick={() => setItemSelected(_id)}
        >
          Chi tiết
        </button>
        <button className="btn btn-client btn--re-order">Đặt lại</button>
      </td>
      <ModalDetailOrder
        isModalVisible={!!itemSelected}
        close={() => setItemSelected("")}
        data={itemSelected}
      />
    </tr>
  );
};

const MyOrders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    document.title = "Lịch sử đơn hàng | ECook";
    window.scrollTo(0, 0);

    setData(ORDERS_DATA);
  }, []);

  return (
    <div className="my-orders-container">
      <div className="flex items-center j-space-between full-width">
        <SearchField onChange={(e) => console.log(e.target.value)} />
        <div className="flex items-center">
          <div className="status">{OPTION_FILTER[0]}</div>
          <DropdownCommon
            label="Bộ lọc trạng thái"
            options={OPTION_FILTER}
            handleMenuClick={(e) => console.log(e)}
          />
        </div>
      </div>

      <Paper className="my-orders-container--content">
        {data?.length > 0 ? (
          <div className="my-orders-container--content__inner">
            <table className="my-orders-container--content__inner--table">
              <thead>
                <th>STT</th>
                <th>Mã đơn hàng</th>
                <th>Thời gian đặt</th>
                <th>Thời gian đến</th>
                <th>Điểm đến</th>
                <th>Thanh toán</th>
                <th>Nhân viên</th>
                <th>Tổng tiền </th>
                <th></th>
              </thead>
              <tbody>
                {data
                  ?.filter((item, indx) => indx < 8)
                  .map((item, index) => (
                    <RowContent row={item} index={index} key={item._id} />
                  ))}
              </tbody>
            </table>
            <div className="my-orders-container--content__inner--pagination">
              <Pagination count={10} color="secondary" />
            </div>
          </div>
        ) : (
          <div className="center flex-col" style={{ position: "relative" }}>
            <img src={EmptyOrder} alt="" />
            <span
              style={{
                fontSize: 24,
                color: "gray",
                position: "absolute",
                bottom: 80,
              }}
            >
              Đơn hàng trống!
            </span>
          </div>
        )}
      </Paper>
    </div>
  );
};
export default MyOrders;
