import { Paper, TablePagination, Tooltip } from "@material-ui/core";
// import { Pagination } from "@material-ui/lab";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formatCurrency } from "utils/priceUtils";
import ModalDetailOrder from "./ModalDetailOrder";
import PaidIcon from "assets/icons/paid.jpg";
import UnPaidIcon from "assets/icons/unpaid.jpg";

import { IconButton } from "@material-ui/core";
import { PopoverStickOnHover, SpinLoading } from "components/common";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import EmptyOrder from "assets/images/empty-order.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByClient } from "redux/actions/order";

const OPTION_FILTER = [
  "Tất cả",
  "Đang chờ xác nhận",
  "Đang chuẩn bị",
  "Đang giao hàng",
  "Đã giao hàng",
  // "Đã hủy",
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
        <Tooltip title={_id} arrow placement="top">
          <span>{_id}</span>
        </Tooltip>
      </td>
      <td>
        <span>{moment(createAt).format("HH:mm:ss [] DD/MM/YYYY")}</span>
      </td>
      <td style={{ width: 160 }}>
        <span>
          {deliveryAt
            ? moment(deliveryAt).format("HH:mm:ss [] DD/MM/YYYY")
            : "Chưa cập nhật"}
        </span>
      </td>
      <td
        style={{
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Tooltip title={address} arrow placement="top">
          <span>{address}</span>
        </Tooltip>
      </td>
      <td style={{ width: 120 }}>
        <img
          style={{
            width: paymentMethod === "paypal" ? 75 : 90,
            marginLeft: paymentMethod === "paypal" ? 6 : "-30",
          }}
          src={paymentMethod === "paypal" ? PaidIcon : UnPaidIcon}
          alt=""
        />
      </td>
      <td style={{ width: 150 }}>
        <span>{employee?.fullName || "Chưa cập nhật"}</span>
        {employee?._id && (
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
        )}
      </td>
      <td>{formatCurrency(total)}</td>
      <td style={{ width: 220 }}>
        <button
          className="btn btn-client btn--detail"
          onClick={() => setItemSelected(row)}
        >
          Chi tiết
        </button>
      </td>
      <ModalDetailOrder
        isModalVisible={!!itemSelected}
        close={() => setItemSelected("")}
        item={itemSelected}
      />
    </tr>
  );
};

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [queries, setQueries] = useState({
    statusId: 0,
    searchText: "",
    page: 1,
    numOfPerPage: 5,
  });
  const dispatch = useDispatch();
  const { getOrdersByClient } = useSelector((store) => store.order);
  useEffect(() => {
    document.title = "Lịch sử đơn hàng | ECook";
    window.scrollTo(0, 0);
    dispatch(getAllOrdersByClient(queries));
  }, [dispatch, queries]);

  useEffect(() => {
    setData(getOrdersByClient?.orderList);
  }, [getOrdersByClient]);

  return (
    <div className="my-orders-container">
      {getOrdersByClient?.loading && <SpinLoading />}
      <div className="flex items-center j-space-between full-width">
        <SearchField
          onSubmit={(value) => {
            setQueries({ ...queries, searchText: value });
          }}
        />
        <div className="flex items-center">
          <DropdownCommon
            label={OPTION_FILTER[queries.statusId]}
            selectedItem={OPTION_FILTER[queries.statusId]}
            options={OPTION_FILTER}
            handleMenuClick={(e) => {
              setQueries({ ...queries, statusId: Number(e.key) });
            }}
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
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={getOrdersByClient?.totalRows}
                rowsPerPage={queries.numOfPerPage}
                page={queries.page - 1}
                onPageChange={(e, newPage) => {
                  setQueries({ ...queries, page: newPage + 1 });
                }}
                onRowsPerPageChange={(event) => {
                  const temp = parseInt(event.target.value, 10);
                  setQueries({ ...queries, page: 1, numOfPerPage: temp });
                }}
              />
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
