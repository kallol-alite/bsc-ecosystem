import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../../../assets/logo.svg";

import { setSidebarView } from "../../../../actions/master-actions";
import ConnectWalletButton from "../../../ConnectWalletButton";
import NetworkSwitch from "../../../NetworkSwitch";

const Navbar = () => {
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
      <div className={styles.linkElements}>
        <div>
          <ConnectWalletButton />
          {/* style={{ marginLeft: 10 }} */}
          <NetworkSwitch style={{ marginLeft: 5, marginRight: 5 }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
