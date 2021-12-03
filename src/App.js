import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoaderComponent from "./components/common/Loader";
import DashboardLayout from "./components/layouts/DashboardLayout";
import StakingCard from "./components/cards/StakingCard";
import FarmingCard from "./components/cards/FarmingCard";
import ConnectWalletCard from "./components/cards/ConnectWalletCard";

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
      <LoaderComponent />
      <Switch>
        <DashboardLayout>
          <Route exact path="/">
            <ConnectWalletCard />
          </Route>
          <Route exact path="/staking">
            <StakingCard />
          </Route>
          <Route exact path="/farming">
            <FarmingCard />
          </Route>
        </DashboardLayout>
      </Switch>
    </>
  );
}

export default App;
