import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./style.css";
export default function Index() {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);
  return (
    <div className={`${sidebar ? "sidebarContainer" : "sidebarContainer-close"}`}>
      <div className="sListDiv">
        <ul className=" sidebarList">
          <li className="sideLi">
            <NavLink exact activeClassName="active_class" to='/'>              
              Farming
              <i class="bi bi-bar-chart-fill"></i>
            </NavLink>
          </li>
          <li className="sideLi">
            <NavLink exact activeClassName="active_class" to='/stacking'>
              Stacking
              <i class="bi bi-layers-fill"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
