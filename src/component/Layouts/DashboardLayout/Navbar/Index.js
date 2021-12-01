import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "../../../NetworkSwitch/index";
import { setSidebarView } from "../../../../actions/master-actions";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index() {
  const [isModalOpen, setModalOpen] = useState(false);
  const showButton = () => {
    setModalOpen(!isModalOpen);
  };
  const dispatch = useDispatch();
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);

  return (
    <div className="navBarContainer">
      <div className="logoDiv">
        <img src="https://www.gitbook.com/cdn-cgi/image/height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2Fwhitepaper.forwardprotocol.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-28427.appspot.com%2Fo%2Fspaces%252F-MaOizxUvYLdjsN39mfq%252Favatar-rectangle-1631876254297.png%3Fgeneration%3D1631876254961923%26alt%3Dmedia" />
      </div>
      <div className="burgerIconDiv"> 
        <i class="bi bi-list burgerIcon" onClick={() => dispatch(setSidebarView(!sidebar))}></i>
      </div>
      <div className="listDiv">
        <ul className=" navbarList">
          <li className="navLi">
            <a className="" aria-current="page" href="#">
              Wallet
            </a>
            <a className="iconS">
              <i className="bi bi-wallet2 "></i>
            </a>
          </li>
          <li className="navLi">
            <a className="" aria-current="page" href="#">
              Airdrop
            </a>
            <a className="iconS">
              <i className="bi bi-archive "></i>
            </a>
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
      </div>
    </div>
  );
}
