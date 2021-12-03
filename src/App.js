import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoaderComponent from "./components/common/Loader";
import DashboardLayout from "./components/layouts/DashboardLayout";
import StakingCard from "./components/cards/StakingCard";

import Farming from "./views/Farming";
import { useSelector } from "react-redux";
import ConnectWallet from "./views/ConnectWallet";

function App() {
  const { isWalletConnected } = useSelector((state) => state.masterReducer);

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
      <DashboardLayout>
        <Switch>
          <Route exact path="/">
            <ConnectWallet />
          </Route>
          {isWalletConnected && <Route exact path="/farming" component={Farming} />}
          {isWalletConnected && <Route exact path="/staking" component={StakingCard} />}
          <Route path="*" component={ConnectWallet} />
        </Switch>
      </DashboardLayout>
    </>
  );
}

export default App;
