import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "../components/GoogleButton";
import { setCookie, setCookieForMinutes } from "../functions/cookies";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [tokenResponse, setTokenResponse] = useState(null); // New state to keep track of the received token
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response.access_token);
      setTokenResponse(response.access_token); // Set the token response when successful login
    },
    onError: (error) => {
      alert(error);
      setLoading(false);
    },
    scope:
      "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner",
  });

  useEffect(() => {
    if (tokenResponse) {
      const handleCallbackResponse = async () => {
        try {
          const responseToken = await axios.post(
            "http://localhost:8080/api/v1/authentication/registration",
            {
              googleIdToken: tokenResponse,
            }
          );
          setCookie(
            "access_token",
            responseToken.data.accessToken,
            responseToken.data.expirationTime
          );
          setCookieForMinutes(
            "refresh_token",
            responseToken.data.refreshToken,
            30
          );
          navigate("/profile");
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      handleCallbackResponse();
    }
  }, [tokenResponse, navigate]);

  const loginWrapper = () => {
    setLoading(true);
    login();
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex items-center justify-center">
      <GoogleButton onClick={loginWrapper} isLoading={loading} />
    </div>
  );
};

export default Login;
