import { TableBody, TableCell, TableRow } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { OPTION_FILTER } from "utils/convertUtils";
import { formatCurrency } from "utils/priceUtils";

const BodyContainer = (props) => {
  const { rows, selected, setSelectedItem, setIsOpenModal } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <TableBody>
        {rows?.map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              style={{ cursor: "pointer" }}
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row._id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox"></TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row._id}
              </TableCell>
              <TableCell align="left">{row.customer?.fullName}</TableCell>
              <TableCell align="left">
                <span
                  style={{
                    color:
                      row?.statusId === 4
                        ? "green"
                        : row?.statusId === 1
                        ? "red"
                        : row?.statusId === 3
                        ? "rgb(251 168 11 / 87%)"
                        : "#292929",
                    fontWeight:
                      row?.statusId === 4 || row?.statusId === 3 ? "bold" : "",
                  }}
                >
                  {OPTION_FILTER[row?.statusId]}
                </span>
              </TableCell>
              <TableCell align="left">
                {row.employee?.fullName || "Chưa có"}
              </TableCell>
              <TableCell align="left">
                {row.paymentMethod === "paypal" ? "Paypal" : "Tiền mặt"}
                {row.isPaid ? " (Đã thanh toán)" : ""}
              </TableCell>
              <TableCell align="left">{formatCurrency(row.total)}</TableCell>
              <TableCell align="left">
                {moment(row.createAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                <button
                  className="btn-admin"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(row);
                    setIsOpenModal(true);
                  }}
                >
                  Chi tiết
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default BodyContainer;
