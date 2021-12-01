import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";
import Logo from '../../../../assets/logo.svg'

import { setSidebarView } from "../../../../actions/master-actions";
import WalletModal from "../../../WalletModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.masterReducer);

  return (
    <div className="navBarContainer">
      <div className="burgerIconDiv">
        <i class={`bi ${isSidebarOpen ? "bi-x" : "bi-list"} fs-1 p-1`} onClick={() => dispatch(setSidebarView(!isSidebarOpen))}></i>
      </div>
      <div className="logoDiv">
        <img src={Logo}/>
      </div>
      <div className="mx-2">
        {/* need to refactor for smaller screens */}
        <WalletModal />
      </div>
      {/* <div className="listDiv">
        <ul className=" navbarList">
          <li className="navLi">
          </li>
          <li className="navLi">
            <a className="" aria-current="page" href="#">
              Network Switch
            </a>
            <a className="iconS">
              <i className="bi bi-nintendo-switch "></i>
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
