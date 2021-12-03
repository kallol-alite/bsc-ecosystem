import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
        <ul className={styles.sidebarList}>
          {NAV_LINKS.map((item) => {
            return (
              <NavLink key={item.title} exact activeClassName={styles.activeClass} to={item.path}>
                <li className={styles.sideLi}>
                  {item.logo}
                  {item.title}
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
