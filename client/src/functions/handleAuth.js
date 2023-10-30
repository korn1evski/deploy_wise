// authHandler.js
import axios from "axios";
import {
  getCookie,
  setCookie,
  setCookieForMinutes,
  deleteCookie,
} from "../functions/cookies";

export const handleAuth = async (navigate, setLoading) => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  console.log(accessToken);
  if (!refreshToken) {
    navigate("/login");
  } else {
    if (!accessToken) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/authentication/refresh",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken, expirationTime } = response.data;
        setCookie("access_token", accessToken, expirationTime);
        setCookieForMinutes("refresh_token", response.data.refreshToken, 30);
        setLoading(false);
      } catch (error) {
        console.log(error);
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        navigate("/login");
      }
    }
  }
};
