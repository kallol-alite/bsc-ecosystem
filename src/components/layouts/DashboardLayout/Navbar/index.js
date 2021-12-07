import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import Logo from "../../../../assets/logo.svg";

import { setSidebarView } from "../../../../actions/master-actions";
import ConnectWalletButton from "../../../ConnectWalletButton";
import { useHistory } from "react-router-dom";
import NetworkSwitch from "../../../modals/NetworkSwitch";

const Navbar = (props, context) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.masterReducer);

  const history = useHistory();

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.burgerIconDiv}>
        <i className={`bi ${isSidebarOpen ? "bi-x" : "bi-list"} fs-3 p-1`} onClick={() => dispatch(setSidebarView(!isSidebarOpen))}></i>
      </div>
      <div
        className={styles.logoDiv}
        onClick={() => {
          history.push("/");
        }}
      >
        <img src={Logo} />
      </div>
      <div className="mx-2">
        {/* need to refactor for smaller screens */}
        <ConnectWalletButton />
      </div>
      <div className="mx-2">
        {" "}
        <NetworkSwitch />
      </div>
    </div>
  );
};

export default Navbar;
