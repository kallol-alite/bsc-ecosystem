import React from "react";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";

import "./../DashboardLayout/style.css";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = (props) => {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);
  return (
    <Container fluid className="p-0 m-0">
      <Navbar />
      <div className="bodyContainer">
        <Sidebar />
        <div className={`${sidebar ? "sidebarOpenView" : "sidebarCloseView"}`}>{props.children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
