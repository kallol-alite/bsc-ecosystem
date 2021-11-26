import React from "react";
import { Switch,Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./SidebarV2";
import Staking from "../Staking";
 const DashboardLayout = () => {
  return (
    <div className='dashboard-layout'>
     <div className='main'>   
       <Navbar />       
       <Sidebar />
       </div>
      {/* <Switch>
          <Route path='/Staking' component={()=><Staking/>} />     
      </Switch>       */}
      
    </div>
  );
};
export default DashboardLayout;

