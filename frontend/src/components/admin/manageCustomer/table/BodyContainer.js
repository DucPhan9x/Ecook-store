import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";
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
    setSelected,
    setSelectedCustomer,
    setIsOpenModalDetail,
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
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

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
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={(event) => handleClick(event, row._id)}
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  {row._id}
                </TableCell>
                <TableCell align="left">{row.fullName}</TableCell>
                <TableCell align="left">
                  {moment(row.dateOfBirth).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.gender ? "Nu" : "Nam"}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="center">
                  <button
                    className="btn-admin"
                    style={{ marginRight: 12 }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Khóa tài khoản
                  </button>
                  <button
                    className="btn-admin"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomer(row);
                      setIsOpenModalDetail(true);
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
