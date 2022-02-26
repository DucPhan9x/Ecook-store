import { Checkbox, Grid } from "@material-ui/core";
import { CardEmployee } from "components/admin/manageEmployee";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ModalAdd from "components/admin/manageEmployee/ModalAdd";
import ModalEdit from "components/admin/manageEmployee/ModalEdit";
import { RemoveCircle } from "@material-ui/icons";
import DialogConfirm from "components/common/DialogConform";
import { useDispatch, useSelector } from "react-redux";
import {
  banOrUnBanEmployees,
  getListEmployeePerPage,
} from "redux/actions/employee";
import { SpinLoading } from "components/common";

const ManageEmployee = () => {
  const [data, setData] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [queries, setQueries] = useState({
    searchText: "",
    employeeType: 0,
  });
  const {
    loadingGetListEmployee,
    employeeList,
    banUnBanEmployeesState,
    createEmployeeState,
  } = useSelector((store) => store.employee);
  const handleChange = (event) => {
    if (event.target.value === "both") {
      // setFilterData(employees);
      setQueries({ ...queries, employeeType: 0 });
    } else {
      setQueries({
        ...queries,
        employeeType: event.target.value === "employee" ? 3 : 4,
      });

      // setFilterData(
      //   employees?.filter((item) => item.role === event.target.value)
      // );
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Quản lý nhân viên | ECook";
    window.scrollTo(0, 0);
    //employee
    dispatch(getListEmployeePerPage(queries));
  }, [dispatch, queries]);

  useEffect(() => {
    if (!employeeList.length) return;
    setData(employeeList.map((item) => ({ ...item, isSelected: false })));
  }, [employeeList]);

  const handleSubmit = (formData) => {
    console.log({ formData });
  };

  const [cardSelected, setCardSelected] = useState("");
  const [isStatusBan, setIsStatusBan] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  return (
    <div className="manage-employee-container">
      <div className="manage-employee-container-top">
        <div className="flex items-center">
          <SearchField
            onSubmit={(value) =>
              setQueries({ ...queries, searchText: value, page: 1 })
            }
          />

          <button
            style={{ marginLeft: 12 }}
            disabled={data.filter((item) => item.isSelected)?.length <= 0}
            className={`btn-admin ${
              data.filter((item) => item.isSelected)?.length > 0
                ? ""
                : "btn-disabled"
            }`}
            onClick={() => {
              setOpenDialogConfirm(true);
              setIsStatusBan(true);
            }}
          >
            <RemoveCircle color="secondary" />
            Khóa
          </button>
          <button
            disabled={data.filter((item) => item.isSelected)?.length <= 0}
            style={{ marginLeft: 12 }}
            className={`btn-admin ${
              data.filter((item) => item.isSelected)?.length > 0
                ? ""
                : "btn-disabled"
            }`}
            onClick={() => {
              setIsStatusBan(false);
              setOpenDialogConfirm(true);
            }}
          >
            <RemoveCircle color="secondary" />
            Mở khóa
          </button>
          <Checkbox
            className="radio-checked-container"
            checked={data?.filter((item) => !item.isSelected)?.length === 0}
            onChange={(e) => {
              e.stopPropagation();
              let temp = [...data];
              const isAllSelected =
                data?.filter((item) => !item.isSelected)?.length === 0;
              temp.forEach((item) => {
                item.isSelected = !isAllSelected;
              });
              setData(temp);
            }}
          />
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="role"
            name="role"
            value={
              queries.employeeType === 0
                ? "both"
                : queries.employeeType === 3
                ? "employee"
                : "instructor"
            }
            onChange={handleChange}
            className="flex flex-row"
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Nhân viên"
            />
            <FormControlLabel
              value="instructor"
              control={<Radio />}
              label="Giáo viên"
            />
            <FormControlLabel value="both" control={<Radio />} label="Cả hai" />
          </RadioGroup>
        </FormControl>
        <button className="btn-admin" onClick={() => setOpenModalAdd(true)}>
          <GroupAddIcon color="action" />
          Tạo mới
        </button>
      </div>
      <Grid container spacing={2}>
        {data?.map((em) => (
          <Grid
            key={em._id}
            item
            xs={6}
            md={4}
            lg={4}
            onClick={(e) => {
              if (e.target.type === "checkbox") return;
              setCardSelected(em);
              setOpenModalEdit(true);
            }}
          >
            <CardEmployee data={em} setData={setData} items={data} />
          </Grid>
        ))}
      </Grid>
      <ModalAdd
        isModalVisible={openModalAdd}
        handleSubmit={handleSubmit}
        close={() => setOpenModalAdd(false)}
      />
      <ModalEdit
        isModalVisible={openModalEdit}
        handleSubmit={handleSubmit}
        close={() => setOpenModalEdit(false)}
        selectedItem={cardSelected}
      />
      <DialogConfirm
        open={openDialogConfirm}
        handleClose={() => setOpenDialogConfirm(false)}
        message={isStatusBan ? "khóa" : "mở khóa"}
        handleSubmit={() => {
          if (isStatusBan) {
            dispatch(
              banOrUnBanEmployees({
                employeeIds: data
                  .filter((item) => item.isSelected)
                  .map((item) => item._id),
                isBanned: true,
              })
            );
          } else {
            dispatch(
              banOrUnBanEmployees({
                employeeIds: data
                  .filter((item) => item.isSelected)
                  .map((item) => item._id),
                isBanned: false,
              })
            );
          }
          setOpenDialogConfirm(false);
        }}
      />
      {(loadingGetListEmployee ||
        banUnBanEmployeesState?.loading ||
        createEmployeeState?.loading) && <SpinLoading />}
    </div>
  );
};

export default ManageEmployee;
