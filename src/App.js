import Layout from "./component/Layouts/DashboardLayout/Index";
// import Farming from './component/Farming';
// import Staking from './component/Staking';
import { Switch, Route } from "react-router-dom";
// import StackingCard from "./component/StackingCard";

function App() {
  return (
    <div className="App">
      <Layout />
      {/* <StackingCard /> */}
      <Switch>
        {/* <Route exact path='/' component={Farming} exact />
        <Route path='/staking' component={Staking} /> */}
      </Switch>
    </div>
  );
}

export default App;
