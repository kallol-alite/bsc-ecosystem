import React,{useState} from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,Badge } from "reactstrap";
import Switch from './../../../NetworkSwitch/index';
import "./style.css";
export default function Index() {
  const[isModalOpen,setModalOpen]= useState(false);
  const showButton = () => { return setModalOpen(!isModalOpen)}
  console.log(isModalOpen);
  return (
    <div>
      <Navbar className="navBar" expand="md" light>
        <NavbarBrand href="/">
          <i class="bi bi-list"></i>
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href='#'>Wallet</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Airdrop</NavLink>
          </NavItem>
          <NavItem>
           <NavLink href="#" onClick={()=>showButton()}><Badge pill>Secondary</Badge></NavLink>
            <Switch showButton={showButton} isModalOpen={isModalOpen} />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
