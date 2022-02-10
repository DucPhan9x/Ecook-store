import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

export const setAccessToken = (accessToken) => {
  Cookies.set("accessToken", accessToken);
};

export const getRefreshAccessToken = () => {
  const accessToken = Cookies.get("refreshAccessToken");
  return accessToken;
};

export const setRefreshAccessToken = (accessToken) => {
  Cookies.set("refreshAccessToken", accessToken);
};
