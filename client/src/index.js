import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthHOC from "./hocs/AuthHOC";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <AuthHOC>
          <App />
        </AuthHOC>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
