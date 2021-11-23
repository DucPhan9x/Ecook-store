import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Tên" },
  { id: "type", numeric: false, disablePadding: false, label: "Loại" },
  {
    id: "unitPrice",
    numeric: true,
    disablePadding: false,
    label: "Giá cả (kg)",
  },
  // {
  //   id: "description",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Mô tả",
  // },
  // { id: "imageUrl", numeric: true, disablePadding: false, label: "Protein (g)" },
  {
    id: "numOfStars",
    numeric: true,
    disablePadding: false,
    label: "Lượt đánh giá",
  },
  // { id: "numOfFeedbacks", numeric: true, disablePadding: false, label: "Protein (g)" },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày nhập hàng",
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
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
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
