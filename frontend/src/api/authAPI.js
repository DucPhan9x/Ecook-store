const url = process.env.REACT_APP_API_URL;

const login = ({ email, password }) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/login`, requestOptions);
};

const register = ({ email, password, fullName }) => {
  let formdata = new FormData();
  formdata.append("fullName", fullName);
  formdata.append("roleId", 1); // 1 customer, 2 employee, 3 instructor
  formdata.append("email", email);
  formdata.append("password", password);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/register`, requestOptions);
};

const sendResetCode = (email) => {
  let formdata = new FormData();
  formdata.append("email", email);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/send-reset-code`, requestOptions);
};

const resetPassword = ({ email, code, newPassword, confirmPassword }) => {
  let formdata = new FormData();
  formdata.append("code", code);
  formdata.append("email", email);
  formdata.append("newPassword", newPassword);
  formdata.append("confirmPassword", confirmPassword);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/new-password`, requestOptions);
};

//admin, employee, instructor
const loginAdmin = ({ email, password }) => {
  let formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/admin/login`, requestOptions);
};
const createNewAdminAccount = ({ email, password, fullName }) => {
  let formdata = new FormData();
  formdata.append("fullName", fullName);
  formdata.append("roleId", 2); // 1 customer, 2 admin, 3 employee, 4 instructor
  formdata.append("email", email);
  formdata.append("password", password);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/admin/register`, requestOptions);
};

const resetPasswordAdmin = ({ email, code, newPassword, confirmPassword }) => {
  let formdata = new FormData();
  formdata.append("code", code);
  formdata.append("email", email);
  formdata.append("newPassword", newPassword);
  formdata.append("confirmPassword", confirmPassword);

  let requestOptions = {
    method: "POST",
    body: formdata,
  };

  return fetch(`${url}auth/admin/new-password`, requestOptions);
};

const getToken = ({ refreshToken }) => {
  let formdata = new FormData();
  formdata.append("refreshToken", refreshToken);

  let requestOptions = {
    method: "GET",
    body: formdata,
  };
  return fetch(`${url}auth/refresh-token`, requestOptions);
};

const checkExpiredToken = ({ token }) => {
  let formdata = new FormData();
  formdata.append("token", token);

  let requestOptions = {
    method: "GET",
    body: formdata,
  };
  return fetch(`${url}auth/check-expired-token`, requestOptions);
};

const authAPI = {
  login,
  register,
  sendResetCode,
  resetPassword,
  loginAdmin,
  createNewAdminAccount,
  resetPasswordAdmin,
  getToken,
  checkExpiredToken,
};
export default authAPI;
