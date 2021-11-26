import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import WalletDropdownIcon from "../../assets/wallet-icon.png";
import WalletDropdownActiveIcon from "../../assets/wallet-active-icon.png";

export function WalletDropdown() {
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isAirdropDropdownOpen, setIsAirdropDropdownOpen] = useState(false);

  const toggleDropDown = (type) => {
    switch (type) {
      case "wallet":
        if (!isWalletDropdownOpen) {
          setIsWalletDropdownOpen(!isWalletDropdownOpen);
          setIsAirdropDropdownOpen(isWalletDropdownOpen);
        } else {
          setIsWalletDropdownOpen(!isWalletDropdownOpen);
        }
        break;
      case "airdrop":
        if (!isAirdropDropdownOpen) {
          setIsAirdropDropdownOpen(!isAirdropDropdownOpen);
          setIsWalletDropdownOpen(isAirdropDropdownOpen);
        } else {
          setIsAirdropDropdownOpen(!isAirdropDropdownOpen);
        }
        break;
      default:
        break;
    }
  }; 

  return (
    <div className='header-dropdown-container'>
      <div className='wallet-dropdown' onClick={() => {toggleDropDown("wallet");}} style={{ borderRight: /* !isConnected && */ "none" }} >
        <div>
          <img src={isWalletDropdownOpen ? WalletDropdownActiveIcon : WalletDropdownIcon} />
        </div>
        <div className='dropdown-label'>Wallet</div>        
      </div>
    </div>     
  )
}