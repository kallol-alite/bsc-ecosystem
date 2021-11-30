import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {DAppProvider} from '@usedapp/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ReduxProvider} from './reducers/index';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
      <ReduxProvider>
        <DAppProvider>
          <App />
        </DAppProvider>
      </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
