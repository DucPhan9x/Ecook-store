import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import HeaderContainer from "./HeaderContainer";
import ToolbarContainer from "./ToolbarContainer";
import BodyContainer from "./BodyContainer";
import { uuid } from "utils/stringUtils";

function createData(uid, calories, fat, carbs, protein) {
  return { uid, calories, fat, carbs, protein };
}

const rows = [
  createData(uuid(), 305, 3.7, 67, 4.3),
  createData(uuid(), 452, 25.0, 51, 4.9),
  createData(uuid(), 262, 16.0, 24, 6.0),
  createData(uuid(), 159, 6.0, 24, 4.0),
  createData(uuid(), 356, 16.0, 49, 3.9),
  createData(uuid(), 408, 3.2, 87, 6.5),
  createData(uuid(), 237, 9.0, 37, 4.3),
  createData(uuid(), 375, 0.0, 94, 0.0),
  createData(uuid(), 518, 26.0, 65, 7.0),
  createData(uuid(), 392, 0.2, 98, 0.0),
  createData(uuid(), 318, 0, 81, 2.0),
  createData(uuid(), 360, 19.0, 9, 37.0),
  createData(uuid(), 437, 18.0, 63, 4.0),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.uid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ToolbarContainer numSelected={selected.length} />
        <TableContainer className="table-container">
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <HeaderContainer
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <BodyContainer
              rows={rows}
              order={order}
              orderBy={orderBy}
              selected={selected}
              setSelected={setSelected}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
