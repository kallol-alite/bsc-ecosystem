import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink,Badge } from "reactstrap";
import "./style.css";
export default function Index() {
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
           <NavLink href="#"><Badge pill>Secondary</Badge></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
