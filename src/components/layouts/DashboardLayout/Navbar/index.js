import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import Logo from "../../../../assets/logo.svg";

import { setSidebarView } from "../../../../actions/master-actions";
import ConnectWalletButton from "../../../ConnectWalletButton";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.masterReducer);

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.burgerIconDiv}>
        <i className={`bi ${isSidebarOpen ? "bi-x" : "bi-list"} fs-1 p-1`} onClick={() => dispatch(setSidebarView(!isSidebarOpen))}></i>
      </div>
      <div className={styles.logoDiv}>
        <img src={Logo} />
      </div>
      <div className="mx-2">
        {/* need to refactor for smaller screens */}
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Navbar;
