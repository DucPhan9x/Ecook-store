import { Checkbox, Grid } from "@material-ui/core";
import { CardEmployee } from "components/admin/manageEmployee";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import { EMPLOYEES_DATA, INSTRUCTORS_DATA } from "utils/dummyData";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ModalAdd from "components/admin/manageEmployee/ModalAdd";
import ModalEdit from "components/admin/manageEmployee/ModalEdit";
import { RemoveCircle } from "@material-ui/icons";
import DialogConfirm from "components/common/DialogConform";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [employeeRole, setEmployeeRole] = React.useState("employee");
  const [filterData, setFilterData] = React.useState([]);

  const handleChange = (event) => {
    setEmployeeRole(event.target.value);
    if (event.target.value === "both") {
      setFilterData(employees);
    } else {
      setFilterData(
        employees?.filter((item) => item.role === event.target.value)
      );
    }
  };

  useEffect(() => {
    document.title = "Quản lý nhân viên | ECook";
    window.scrollTo(0, 0);
    setFilterData(employees);
  }, [employees]);

  useEffect(() => {
    setEmployees(
      EMPLOYEES_DATA.concat(INSTRUCTORS_DATA).map((item) => ({
        ...item,
        isSelected: false,
      }))
    );
  }, []);

  const handleSubmit = (formData) => {
    console.log({ formData });
  };

  const [cardSelected, setCardSelected] = useState("");

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  return (
    <div className="manage-employee-container">
      <div className="manage-employee-container-top">
        <div className="flex items-center">
          <SearchField onChange={(e) => console.log(e.target.value)} />
          <button
            style={{ marginLeft: 12 }}
            className={`btn-admin ${
              filterData.filter((item) => item.isSelected)?.length > 0
                ? ""
                : "btn-disabled"
            }`}
            onClick={() => {
              if (!filterData.filter((item) => item.isSelected)?.length) return;
              setOpenDialogConfirm(true);
            }}
          >
            <RemoveCircle color="secondary" />
            Xóa
          </button>
          <button
            style={{ marginLeft: 12 }}
            className={`btn-admin ${
              filterData.filter((item) => item.isSelected)?.length > 0
                ? ""
                : "btn-disabled"
            }`}
            onClick={() => {
              if (!filterData.filter((item) => item.isSelected)?.length) return;
              setOpenDialogConfirm(true);
            }}
          >
            <RemoveCircle color="secondary" />
            Khóa
          </button>
          <button
            style={{ marginLeft: 12 }}
            className={`btn-admin ${
              filterData.filter((item) => item.isSelected)?.length > 0
                ? ""
                : "btn-disabled"
            }`}
            onClick={() => {
              if (!filterData.filter((item) => item.isSelected)?.length) return;
              setOpenDialogConfirm(true);
            }}
          >
            <RemoveCircle color="secondary" />
            Mở khóa
          </button>
          <Checkbox
            className="radio-checked-container"
            checked={
              filterData?.filter((item) => !item.isSelected)?.length === 0
            }
            onChange={(e) => {
              e.stopPropagation();
              let temp = [...filterData];
              const isAllSelected =
                filterData?.filter((item) => !item.isSelected)?.length === 0;
              temp.forEach((item) => {
                item.isSelected = !isAllSelected;
              });
              setFilterData(temp);
            }}
          />
        </div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="role"
            name="role"
            value={employeeRole}
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
        {filterData?.map((em) => (
          <Grid
            key={em._id}
            item
            xs={6}
            md={4}
            lg={3}
            onClick={(e) => {
              if (e.target.type === "checkbox") return;
              setCardSelected(em);
              setOpenModalEdit(true);
            }}
          >
            <CardEmployee
              data={em}
              filterData={filterData}
              setFilterData={setFilterData}
            />
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
        message="xóa"
        handleSubmit={() => {
          setFilterData(filterData.filter((item) => !item.isSelected));
          // call API
          // useNotification.Error({
          //   title: "Setup company error",
          //   message: "aaaaaaaaaaaaa",
          // });
          setOpenDialogConfirm(false);
        }}
      />
    </div>
  );
};

export default ManageEmployee;
