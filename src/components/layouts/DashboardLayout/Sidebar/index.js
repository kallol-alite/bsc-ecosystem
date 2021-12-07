import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ConnectWalletButton from "../../../ConnectWalletButton";
import NetworkSwitch from "../../../NetworkSwitch";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);

  const NAV_LINKS = [
    {
      logo: <i className="bi bi-layers-fill"></i>,
      title: "Farming",
      path: "/farming",
    },
    {
      logo: <i className="bi bi-bar-chart-fill"></i>,
      title: "Staking",
      path: "/staking",
    },
  ];

  return (
    <div className={`${sidebar ? styles.sidebarContainer : styles.sidebarContainerClose}`}>
      <div className={styles.sListDiv}>
        <div className={styles.showElements}>
          <ConnectWalletButton style={{ width: "100%" }} />
          <NetworkSwitch style={{ marginTop: 10, width: "100%" }} />
        </div>
        <ul className={styles.sidebarList}>
          {NAV_LINKS.map((item) => {
            return (
              <NavLink key={item.title} exact activeClassName={styles.activeClass} to={item.path}>
                <li className={styles.sideLi}>
                  {item.logo}
                  <span className="mx-1">{item.title}</span>
                  {/* {item.title} */}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
