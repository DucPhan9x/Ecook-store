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
import { ROUTE_ADMIN_DASHBOARD_RECIPES } from "utils/routes";
import { Rate } from "antd";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { useDispatch } from "react-redux";
import { getRecipeById } from "redux/actions/recipe";

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
  const dispatch = useDispatch();

  return (
    <>
      <TableBody>
        {rows.length > 0 &&
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
                <TableCell align="left">{row?.name}</TableCell>
                <TableCell
                  style={{
                    maxWidth: 200,
                    maxHeight: 50,
                  }}
                  align="left"
                  className="text-ellipses"
                >
                  {row?.contents?.length > 0 && row?.contents[0]}
                </TableCell>
                <TableCell align="left">
                  {row?.materials
                    ?.filter((item, index) => index < 2)
                    .map((item) => (
                      <div key={item._id}>
                        {item.foodName +
                          ": " +
                          item.quantity +
                          "(" +
                          item.unit +
                          ")"}
                      </div>
                    ))}
                  ...
                </TableCell>
                <TableCell align="left">{row.slotQuantity} người ăn</TableCell>
                <TableCell align="left">
                  <Rate value={Math.round(row.numOfStars)} disabled />
                </TableCell>
                <TableCell align="left">
                  {moment(row.createAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell align="center">
                  <button
                    className="btn-admin"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(
                        `${ROUTE_ADMIN_DASHBOARD_RECIPES}/edit/${row._id}`
                      );
                    }}
                  >
                    Chi tiết
                  </button>
                  <IconButton
                    style={{ marginLeft: 12 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        getRecipeById(row._id, (res) => {
                          if (res.status === 200) {
                            setFeedbackItemSelected({
                              open: true,
                              feedbacks: res?.recipe?.feedbacks || [],
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
