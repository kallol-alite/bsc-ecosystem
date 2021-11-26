import React from "react";

import { WalletDropdown } from "./WalletDropdown";

import Logo from '../../assets/YfdaiLogo.svg';
const Navbar = () => {


  return (
    <div className='navbar-container'>
      <div className='navbar-main navbar-container-fullwnode i webidth' style={{width:"100%"}}>
        <div className='navbar-name'>
          <div className='burger'>
            <img src={Logo}/>
          </div>          
        </div>
        <div className='connection'>
          <WalletDropdown />         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
