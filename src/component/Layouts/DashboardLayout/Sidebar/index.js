import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./style.css";

const Sidebar = () => {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);

  const NAV_LINKS = [
    {
      logo: <i class="bi bi-layers-fill"></i>,
      title: "Farming",
      path: "/farming",
    },
    {
      logo: <i class="bi bi-bar-chart-fill"></i>,
      title: "Staking",
      path: "/staking",
    },
  ];

  return (
    <div className={`${sidebar ? "sidebarContainer" : "sidebarContainer-close"}`}>
      <div className="sListDiv">
        <ul className=" sidebarList">
          {NAV_LINKS.map((item) => {
            return (
              <NavLink exact activeClassName="active_class" to={item.path}>
                <li className="sideLi">
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
