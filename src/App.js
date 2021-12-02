import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FarmingView from "./views/Farming";

import DashboardLayout from "./component/Layouts/DashboardLayout";
import StackingCard from "./component/StackingCard/index";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <DashboardLayout>
          <Route exact path="/">
            Dashboard
          </Route>
          <Route exact path="/staking">
            <StackingCard />
          </Route>
          <Route exact path="/farming" component={FarmingView} />
        </DashboardLayout>
      </Switch>
    </>
  );
}

export default App;
