import employeeAPI from "api/employeeAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/employee";

const banOrUnBanEmployees = ({ employeeIds, isBanned }) => {
  return (dispatch) => {
    dispatch({ type: types.BAN_OR_UN_BAN_EMPLOYEES });
    employeeAPI
      .banOrUnBanEmployee({ employeeIds, isBanned })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.BAN_OR_UN_BAN_EMPLOYEES_SUCCEED,
            payload: { employeeIds, isBanned },
          });
        } else {
          dispatch({ type: types.BAN_OR_UN_BAN_EMPLOYEES_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Ban(un-ban) employee failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.BAN_OR_UN_BAN_EMPLOYEES_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteEmployees = (employeeIds) => {
  return (dispatch) => {
    dispatch({ type: types.DELETE_EMPLOYEES });
    employeeAPI
      .deleteEmployees(employeeIds)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.DELETE_EMPLOYEES_SUCCEED,
            payload: employeeIds,
          });
        } else {
          dispatch({ type: types.DELETE_EMPLOYEES_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete employee(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.DELETE_EMPLOYEES_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListEmployeePerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_EMPLOYEES });
    employeeAPI
      .getListEmployees(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_EMPLOYEES_SUCCEED,
            payload: {
              employees: result.employees,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_EMPLOYEES_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get employee(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_EMPLOYEES_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getEmployeeById = (employeeId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_EMPLOYEE_BY_ID });
    employeeAPI
      .getEmployeeById(employeeId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_EMPLOYEE_BY_ID_SUCCEED,
            payload: result.employee,
          });
        } else {
          dispatch({ type: types.GET_EMPLOYEE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get employee failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_EMPLOYEE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  getEmployeeById,
  getListEmployeePerPage,
  banOrUnBanEmployees,
  deleteEmployees,
};
