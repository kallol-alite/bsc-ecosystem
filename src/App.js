import Layout from "./component/Layouts/DashboardLayout/Index";
// import Farming from './component/Farming';
// import Staking from './component/Staking';
import { Switch, Route } from "react-router-dom";
import FarmingCard from './components/FarmingCard.js';
function App() {
  return (
    <div className="App">
      <Layout />
      <Switch>
        <Route exact path='/' exact ><FarmingCard/></Route>
        {/* <Route path='/staking' component={Staking} /> */}
      </Switch>
      
    </div>
  );
}

export default App;
