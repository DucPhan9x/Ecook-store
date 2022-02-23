import { TableBody, TableCell, TableRow } from "@material-ui/core";
import moment from "moment";
import React from "react";

const BodyContainer = (props) => {
  const {
    rows,
    order,
    orderBy,
    page,
    rowsPerPage,
    selected,
    setSelectedItem,
    setIsOpenModal,
  } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <>
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
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
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  {row._id}
                </TableCell>
                <TableCell align="left">{row.customer?.name}</TableCell>
                <TableCell align="left">
                  {row.orderStatus?.description}
                </TableCell>
                <TableCell align="left">
                  {row.employee?.name || "Chưa có"}
                </TableCell>
                <TableCell align="left">{row.paymentMethod}</TableCell>
                <TableCell align="left">{row.total}</TableCell>
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
