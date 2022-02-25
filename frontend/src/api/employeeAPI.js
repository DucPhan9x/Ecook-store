const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const createEmployee = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: JSON.stringify(data),
  };
  return fetch(`${url}employee`, requestOptions);
};

const getListEmployees = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { searchText, employeeType } = data;

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(
    `${url}employee?searchText=${searchText}&employeeType=${employeeType}`,
    requestOptions
  );
};

const getEmployeeById = (employeeId) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}employee/${employeeId}`, requestOptions);
};

const deleteEmployees = (employeeIds) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "DELETE",
    body: JSON.stringify({ employeeIds }),
  };
  return fetch(`${url}employee`, requestOptions);
};

const banOrUnBanEmployee = (data) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);

  let requestOptions = {
    headers: myHeaders,
    method: "PUT",
    body: JSON.stringify(data), // data: {courseIds, isBanned}
  };
  return fetch(`${url}employee`, requestOptions);
};

const employeeAPI = {
  createEmployee,
  getListEmployees,
  getEmployeeById,
  deleteEmployees,
  banOrUnBanEmployee,
};
export default employeeAPI;
