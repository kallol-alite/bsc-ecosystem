import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ConnectWalletButton from "../../../ConnectWalletButton";
import NetworkSwitch from "../../../NetworkSwitch";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { isSidebarOpen: sidebar, isWalletConnected } = useSelector((state) => state.masterReducer);

  const NAV_LINKS = [
    {
      logo: <i className="bi bi-bar-chart-fill"></i>,
      title: "Staking",
      path: "/staking",
    },
    {
      logo: <i className="bi bi-layers-fill"></i>,
      title: "Farming",
      path: "/farming",
    },
    {
      logo: <i className="bi bi-people-fill"></i>,
      title: "Social Tokens",
      path: "/social-tokens",
    },
    {
      logo: <i className="bi bi-link"></i>,
      title: "Forward Chain",
      path: "/forward-chain",
    },
    {
      logo: <i className="bi bi-person-lines-fill"></i>,
      title: "Forward ID",
      path: "/forward-id",
    },
    {
      logo: <i className="bi bi-wallet-fill"></i>,
      title: "Forward Pay",
      path: "/forward-pay",
    },
    {
      logo: <i className="bi bi-building"></i>,
      title: "Forward Factory",
      path: "/forward-factory",
    },
  ];

  return (
    <div className={`${sidebar ? styles.sidebarContainer : styles.sidebarContainerClose}`}>
      <div className={styles.sListDiv}>
        <div className={styles.showElements}>
          <ConnectWalletButton style={{ width: "100%" }} showConnectedAddress={true} />
          {isWalletConnected && <NetworkSwitch style={{ marginTop: 10, width: "100%" }} />}
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
