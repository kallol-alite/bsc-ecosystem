import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App";
import { ReduxProvider } from "./reducers/index";

ReactDOM.render(
  <ReduxProvider>
    <DAppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DAppProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
