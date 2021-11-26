import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import "./style.css";
export default function Index() {
  return (
    <div>
      <Nav vertical className="sidebar">
        <NavItem>
          <NavLink className="navLink">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navLink">Disabled Link</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
