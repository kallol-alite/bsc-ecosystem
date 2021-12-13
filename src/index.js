import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import { createBrowserHistory } from "history";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App";
import { ReduxProvider } from "./reducers/index";

export const history = createBrowserHistory();

ReactDOM.render(
  <ReduxProvider>
    <DAppProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </DAppProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
