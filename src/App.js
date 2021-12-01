import Layout from "./component/Layouts/DashboardLayout/Index";
import { Switch, Route } from "react-router-dom";
import FarmingView from './views/Farming'

function App() {
  return (
    <div className="App">
      <Layout >
        <Switch>
          <Route path='/farming' component={FarmingView} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
