import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "customer",
    numeric: false,
    disablePadding: false,
    label: "Tên khách hàng",
  },
  {
    id: "orderStatus",
    numeric: true,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "employee",
    numeric: false,
    disablePadding: false,
    label: "Nhân viên nhận giao",
  },
  {
    id: "paymentMethod",
    numeric: false,
    disablePadding: false,
    label: "Cách thức thanh toán",
  },
  { id: "total", numeric: false, disablePadding: false, label: "Tổng tiền" },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
  },
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  // { id: "updateAt", numeric: true, disablePadding: false, label: "Protein (g)" },
];

const HeaderContainer = (props) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default HeaderContainer;
