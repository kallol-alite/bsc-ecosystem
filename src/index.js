import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ReduxProvider } from "./reducers/index";
import { BrowserRouter } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DAppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </DAppProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
