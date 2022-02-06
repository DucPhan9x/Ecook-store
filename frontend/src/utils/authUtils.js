import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken;
};

export const setAccessToken = (accessToken) => {
  Cookies.set("accessToken", accessToken);
};

export const getAccessTokenSystem = () => {
  const accessToken = Cookies.get("accessTokenSystem");
  return accessToken;
};

export const setAccessTokenSystem = (accessToken) => {
  Cookies.set("accessTokenSystem", accessToken);
};
