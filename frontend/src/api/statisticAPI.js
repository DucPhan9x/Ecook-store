const { getAccessToken } = require("utils/authUtils");
const url = process.env.REACT_APP_API_URL;

const getRevenuesInfo = (getInfoBy) => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}statistic/revenueInfo/${getInfoBy}`, requestOptions);
};

const getGeneralInfo = () => {
  const token = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", `application/json`);
  let requestOptions = {
    headers: myHeaders,
    method: "GET",
  };
  return fetch(`${url}statistic/generalInfo`, requestOptions);
};

const statisticAPI = {
  getGeneralInfo,
  getRevenuesInfo,
};
export default statisticAPI;
