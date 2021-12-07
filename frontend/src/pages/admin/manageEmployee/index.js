import { Grid } from "@material-ui/core";
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

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [employeeRole, setEmployeeRole] = React.useState("Nhân viên");
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
    setFilterData(employees);
  }, [employees]);

  useEffect(() => {
    setEmployees(EMPLOYEES_DATA.concat(INSTRUCTORS_DATA));
  }, []);

  const handleSubmit = (formData) => {
    console.log({ formData });
  };

  const [cardSelected, setCardSelected] = useState("");

  return (
    <div className="manage-employee-container">
      <div className="manage-employee-container-top">
        <SearchField onChange={(e) => console.log(e.target.value)} />
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
            onClick={() => {
              setCardSelected(em);
              setOpenModalEdit(true);
            }}
          >
            <CardEmployee data={em} />
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
    </div>
  );
};

export default ManageEmployee;
