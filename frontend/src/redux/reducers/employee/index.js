import * as types from "../../types/employee";

const initialState = {
  banUnBanEmployeesState: {
    loading: false,
  },
  deleteEmployees: {
    loading: false,
  },
  getEmployeeByIdState: {
    loading: false,
  },
  createEmployeeState: {
    loading: false,
  },
  employeeList: [],
  loadingGetListEmployee: false,
  totalPage: 0,
  totalRows: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //ban/unBan employee
    case types.BAN_OR_UN_BAN_EMPLOYEES:
      return {
        ...state,
        banUnBanEmployeesState: {
          loading: true,
        },
      };
    case types.BAN_OR_UN_BAN_EMPLOYEES_SUCCEED: {
      let temp = [...state.employeeList];
      const { employeeIds, isBanned } = actions.payload;
      temp.forEach((item) => {
        if (employeeIds.includes(item._id)) {
          item.isRemoved = isBanned;
        }
      });

      return {
        ...state,
        employeeList: temp,
        banUnBanEmployeesState: {
          loading: false,
        },
      };
    }

    case types.BAN_OR_UN_BAN_EMPLOYEES_FAIL:
      return {
        ...state,
        banUnBanEmployeesState: {
          loading: false,
        },
      };
    //delete employees
    case types.DELETE_EMPLOYEES:
      return {
        ...state,
        deleteEmployees: {
          loading: true,
        },
      };
    case types.DELETE_EMPLOYEES_SUCCEED: {
      let temp = [...state.deleteEmployees];
      const employeeIds = actions.payload;
      temp.filter((i) => !employeeIds.includes(i._id));

      return {
        ...state,
        employeeList: temp,
        deleteEmployees: {
          loading: false,
        },
      };
    }
    case types.DELETE_EMPLOYEES_FAIL:
      return {
        ...state,
        deleteEmployees: {
          loading: false,
        },
      };
    // get list employee per page
    case types.GET_LIST_EMPLOYEES:
      return {
        ...state,
        loadingGetListEmployee: true,
      };
    case types.GET_LIST_EMPLOYEES_SUCCEED:
      return {
        ...state,
        loadingGetListEmployee: false,
        employeeList: actions.payload.employees,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
      };

    case types.GET_LIST_EMPLOYEES_FAIL:
      return {
        ...state,
        loadingGetListEmployee: false,
      };
    // get employee by Id
    case types.GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        getEmployeeByIdState: {
          loading: true,
        },
      };
    case types.GET_EMPLOYEE_BY_ID_SUCCEED:
      return {
        ...state,
        getEmployeeByIdState: {
          loading: false,
        },
      };

    case types.GET_EMPLOYEE_BY_ID_FAIL:
      return {
        ...state,
        getEmployeeByIdState: {
          loading: false,
        },
      };
    // create employee
    // get employee by Id
    case types.CREATE_EMPLOYEE:
      return {
        ...state,
        createEmployeeState: {
          loading: true,
        },
      };
    case types.CREATE_EMPLOYEE_SUCCEED:
      const employee = actions.payload;
      const temp = [...state.employeeList];
      temp.push(employee);
      return {
        ...state,
        createEmployeeState: {
          loading: false,
        },
        employeeList: [...temp],
      };

    case types.CREATE_EMPLOYEE_FAIL:
      return {
        ...state,
        createEmployeeState: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
