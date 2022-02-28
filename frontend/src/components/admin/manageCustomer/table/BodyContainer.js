import { Checkbox, TableBody, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch } from "react-redux";
import { banOrUnBanCustomer } from "redux/actions/customer";

const BodyContainer = (props) => {
  const {
    rows,
    selected,
    setSelected,
    setSelectedCustomer,
    setIsOpenModalDetail,
  } = props;

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const dispatch = useDispatch();

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
              <TableCell align="left">{row.fullName}</TableCell>
              {/* <TableCell align="left">
                {moment(row.dateOfBirth).format("DD/MM/YYYY")}
              </TableCell> */}
              <TableCell align="left">{row.phoneNumber}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="center">
                <button
                  className="btn-admin"
                  style={{
                    marginRight: 12,
                    background: row.isRemoved && "#5cdd3e",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // let temp = [...rows];
                    // temp.forEach((item) => {
                    //   if (item._id === row._id) {
                    //     item.isBlock = !item.isBlock;
                    //   }
                    // });
                    // setRows(temp);
                    if (row.isRemoved) {
                      dispatch(
                        banOrUnBanCustomer({
                          customerIds: [row._id],
                          isBanned: false,
                        })
                      );
                    } else {
                      dispatch(
                        banOrUnBanCustomer({
                          customerIds: [row._id],
                          isBanned: true,
                        })
                      );
                    }
                  }}
                >
                  {row.isRemoved ? "Mở khóa" : "Khóa"}
                  {!row.isRemoved ? (
                    <LockOpenIcon
                      color="action"
                      style={{ marginBottom: 4, marginLeft: 4 }}
                    />
                  ) : (
                    <LockIcon
                      color="action"
                      style={{ marginBottom: 4, marginLeft: 4 }}
                    />
                  )}
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
