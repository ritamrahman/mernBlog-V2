import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";
import store from "./Redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
