import { TableBody, TableCell, TableRow } from "@material-ui/core";
import moment from "moment";
import React from "react";

const BodyContainer = (props) => {
  const {
    rows,
    selected,
    setCertificationSelected,
    setOpenModalCertification,
  } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <TableBody>
        {rows?.length > 0 &&
          rows?.map((row, index) => {
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
                <TableCell align="left">{row.student?.fullName}</TableCell>
                <TableCell align="left">{row.course?.courseName}</TableCell>
                <TableCell align="left">
                  {moment(row.startDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="left">
                  {moment(row.endDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="left">{row.positionCreate}</TableCell>
                <TableCell align="left">
                  {moment(row.createAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center">
                  <button
                    className="btn-admin"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCertificationSelected(row);
                      setOpenModalCertification(true);
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
