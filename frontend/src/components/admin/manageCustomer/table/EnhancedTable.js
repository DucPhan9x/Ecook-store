import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import HeaderContainer from "./HeaderContainer";
import ToolbarContainer from "./ToolbarContainer";
import BodyContainer from "./BodyContainer";
import ModalCustomerDetail from "../ModalCustomerDetail";
import { useSelector } from "react-redux";

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

export default function EnhancedTable({ queries, setQueries }) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const { totalRows, customerList } = useSelector((store) => store.customer);

  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(customerList);
  }, [customerList]);

  const handleRequestSort = (event, property) => {
    const isAsc = queries.orderBy === property && queries.orderType === "asc";
    setQueries({
      ...queries,
      orderBy: property,
      orderType: isAsc ? "desc" : "asc",
      page: 1,
    });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setQueries({ ...queries, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setQueries({ ...queries, numOfPerPage: event.target.value, page: 1 });
  };

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ToolbarContainer
          selected={selected}
          setRows={setRows}
          rows={rows}
          setSelected={setSelected}
        />
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
              order={queries?.orderType}
              orderBy={queries?.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <BodyContainer
              rows={rows}
              order={queries?.orderType}
              orderBy={queries?.orderBy}
              selected={selected}
              setSelected={setSelected}
              rowsPerPage={queries.numOfPerPage}
              page={queries.page - 1}
              setRows={setRows}
              setSelectedCustomer={setSelectedCustomer}
              setIsOpenModalDetail={setIsOpenModalDetail}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={queries.numOfPerPage}
          page={queries.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalCustomerDetail
        isModalVisible={isOpenModalDetail}
        close={() => setIsOpenModalDetail(false)}
        data={selectedCustomer}
      />
    </div>
  );
}
