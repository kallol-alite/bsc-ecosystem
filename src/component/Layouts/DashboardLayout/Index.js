import React from "react";
import { Container } from "reactstrap";
import Navbar from "./Navbar/Index";
import Sidebar from "./Sidebar/Index";
import { useSelector } from "react-redux";
import "./../DashboardLayout/style.css";
export default function Index(props) {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);
  return (
    <Container fluid className="p-0 m-0" >
      <Navbar />
      <div className="bodyContainer">
      <Sidebar />
        <div className={`${ sidebar ? "sidebarOpenView" : "sidebarCloseView"  }`}>
                {props.children}
        </div>
      </div>      
    </Container>
  );
}
