import { Grid, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ORDERS_DATA } from "utils/dummyData";
import { formatCurrency } from "utils/priceUtils";
import ModalDetailOrder from "./ModalDetailOrder";

const RowContent = ({ row, index }) => {
  const { address, _id, employee, total } = row;
  const [itemSelected, setItemSelected] = useState("");
  return (
    <Grid
      container
      spacing={2}
      className="my-orders-container--content__inner-row-content"
    >
      <Grid item xs={1}>
        {index + 1}
      </Grid>
      <Grid item xs={2}>
        {_id}
      </Grid>
      <Grid item xs={4}>
        {address}
      </Grid>
      <Grid item xs={2}>
        {employee?.name}
      </Grid>
      <Grid item xs={1}>
        {formatCurrency(total)}
      </Grid>
      <Grid item xs={2}>
        <button
          className="btn btn-client btn--detail"
          onClick={() => setItemSelected(_id)}
        >
          Chi tiết
        </button>
        <button className="btn btn-client btn--re-order">Đặt lại</button>
      </Grid>
      <ModalDetailOrder
        isModalVisible={!!itemSelected}
        close={() => setItemSelected("")}
        data={itemSelected}
      />
    </Grid>
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
        <DropdownCommon
          label="Bộ lọc trạng thái"
          options={[
            "Tất cả",
            "Đang chờ xác nhận",
            "Đang chuẩn bị",
            "Đang giao hàng",
            "Đã giao hàng",
            "Đã hủy",
          ]}
          handleMenuClick={(e) => console.log(e)}
        />
      </div>

      <Paper className="my-orders-container--content">
        <div className="my-orders-container--content__inner">
          <Grid
            container
            spacing={2}
            className="my-orders-container--content__inner--header"
          >
            <Grid item xs={1}>
              STT
            </Grid>
            <Grid item xs={2}>
              Mã đơn hàng
            </Grid>
            <Grid item xs={4}>
              Điểm đến
            </Grid>
            <Grid item xs={2}>
              Nhân viên
            </Grid>
            <Grid item xs={1}>
              Tổng tiền{" "}
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          {data?.length ? (
            data?.map((item, index) => (
              <RowContent row={item} index={index} key={item._id} />
            ))
          ) : (
            <div>Đang trống</div>
          )}
        </div>
        <div className="my-orders-container--content__inner--pagination">
          <Pagination count={10} color="secondary" />
        </div>
      </Paper>
    </div>
  );
};
export default MyOrders;
