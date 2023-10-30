import React, { useEffect, useState } from "react";
import {
  getCookie,
  setCookie,
  setCookieForMinutes,
  deleteCookie,
} from "../functions/cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import { handleAuth } from "../functions/handleAuth";

const AuthHOC = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleAuth(navigate, setLoading);
  }, []);
  return <>{loading ? <LoadingIndicator /> : children}</>;
};

export default AuthHOC;
