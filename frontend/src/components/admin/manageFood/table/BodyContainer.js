import { IconButton, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Rate } from "antd";
import moment from "moment";
import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { getFoodType } from "utils/convertUtils";
import { useDispatch } from "react-redux";
import { getFoodById, removeTempFoodById } from "redux/actions/food";

const BodyContainer = (props) => {
  const {
    rows,
    // order,
    // orderBy,
    // page,
    // rowsPerPage,
    selected,
    setItemSelected,
    setItemSeeDetail,
    setRows,
    setFeedbackItemSelected,
  } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }
  // function getComparator(order, orderBy) {
  //   return order === "desc"
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }

  // function stableSort(array, comparator) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el) => el[0]);
  // }
  const dispatch = useDispatch();

  return (
    <>
      <TableBody>
        {rows.map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              onClick={() => setItemSeeDetail(row)}
              style={{
                cursor: "pointer",
              }}
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
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{getFoodType(row.typeId)}</TableCell>
              <TableCell align="left">
                {row.unitPrice + "(" + row.unit + ")"}
              </TableCell>
              <TableCell align="left">
                <Rate value={Math.round(row.numOfStars)} disabled />
              </TableCell>
              <TableCell align="left">
                {moment(row.createAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                <button
                  className="btn-admin"
                  style={{
                    marginRight: 12,
                    background: row.isRemoveTemp && "#5cdd3e",
                    width: 160,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    let temp = [...rows];
                    temp.forEach((item) => {
                      if (item._id === row._id) {
                        item.isRemoveTemp = !item.isRemoveTemp;
                      }
                    });
                    setRows(temp);
                  }}
                >
                  {row.isRemoveTemp ? (
                    <div
                      onClick={() => {
                        dispatch(removeTempFoodById(row._id, false));
                      }}
                    >
                      <span
                        style={{
                          width: 105,
                        }}
                      >
                        Mở khóa
                      </span>
                      <LockIcon
                        color="action"
                        style={{ marginBottom: 4, marginLeft: 4 }}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        dispatch(removeTempFoodById(row._id, true));
                      }}
                    >
                      <span
                        style={{
                          width: 105,
                        }}
                      >
                        Khóa tạm thời
                      </span>
                      <LockOpenIcon
                        color="action"
                        style={{ marginBottom: 4, marginLeft: 4 }}
                      />
                    </div>
                  )}
                </button>
                <button
                  className="btn-admin"
                  onClick={(e) => {
                    e.stopPropagation();
                    setItemSelected(row);
                  }}
                >
                  Chỉnh sửa
                </button>
                <IconButton
                  style={{ marginLeft: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      getFoodById(row._id, (res) => {
                        if (res.status === 200) {
                          setFeedbackItemSelected({
                            open: true,
                            feedbacks: res?.food?.feedbacks || [],
                          });
                        }
                      })
                    );
                  }}
                >
                  <FeedbackIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default BodyContainer;
