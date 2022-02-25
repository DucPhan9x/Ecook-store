import {
  Checkbox,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { useSelector } from "react-redux";
import { Rate } from "antd";

const BodyContainer = (props) => {
  const { rows, selected, setSelected, setFeedbackItemSelected } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;

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

  const history = useHistory();
  const { information } = useSelector((store) => store.common)?.userDetail;

  return (
    <>
      <TableBody>
        {rows.map((row, index) => {
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
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row._id}
              </TableCell>
              <TableCell align="left">{row.courseName}</TableCell>
              <TableCell align="left">{row.unitPrice}</TableCell>
              {information?.roleId === 2 && (
                <TableCell align="left">{row.instructor?.fullName}</TableCell>
              )}
              {/* <TableCell align="left">
                  {row.amountStudent}
                  <SupervisorAccountIcon style={{ marginLeft: 8 }} />
                </TableCell> */}
              <TableCell align="left">
                <Rate value={row.numOfStars} disabled />
              </TableCell>
              <TableCell align="left">
                {moment(row.createAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell align="center">
                <button
                  className="btn-admin"
                  style={{ marginRight: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/admin/dashboard/examination/${row._id}`);
                  }}
                >
                  Bài thi
                </button>
                <button
                  className="btn-admin"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/admin/dashboard/courses/edit/${row._id}`);
                  }}
                >
                  Chi tiết
                </button>
                <IconButton
                  style={{ marginLeft: 12 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFeedbackItemSelected(row);
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
