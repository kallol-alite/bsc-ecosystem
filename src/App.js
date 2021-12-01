import Layout from "./component/Layouts/DashboardLayout/Index";
// import Farming from './component/Farming';
// import Staking from './component/Staking';
import FarmingCard from "./components/FarmingCard.js";
import { Switch, Route } from "react-router-dom";
import StackingCard from "./component/StackingCard";

function App() {
  return (
    <div className="App">
      <Layout />
      <Switch>
        <Route exact path="/" exact component={FarmingCard} />
        <Route exact path="/staking" exact component={StackingCard} />
      </Switch>
    </div>
  );
}

export default App;
