import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotification />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
