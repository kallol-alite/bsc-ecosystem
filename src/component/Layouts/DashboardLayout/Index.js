import React from "react";
import { Container } from "reactstrap";
import Navbar from "./Navbar/Index";
import Sidebar from "./Sidebar/Index";
import { useSelector } from "react-redux";
import "./../DashboardLayout/style.css";
// import Staking from "../../StackingCard/index";
import StakingView from "../../../views/Staking/index";
export default function Index() {
  const { isSidebarOpen: sidebar } = useSelector((state) => state.masterReducer);
  return (
    <Container fluid className="p-0 m-0">
      <Navbar />
      <div className="bodyContainer">
        <Sidebar />
        <div className={`${sidebar ? "sidebarOpenView" : "sidebarCloseView"}`}>
          <StakingView />
        </div>
      </div>
    </Container>
  );
}
