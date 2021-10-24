import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

export const setAccessToken = (accessToken) => {
  Cookies.set("accessToken", accessToken);
};
