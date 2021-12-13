import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import LoaderComponent from "./components/common/Loader";
import DashboardLayout from "./components/layouts/DashboardLayout";

// import Farming from "./views/Farming";
import Staking from "./views/StakingV2";
import ConnectWallet from "./views/ConnectWallet";
import ComingSoon from "./views/ComingSoon";

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
            {isWalletConnected && <Redirect from="/" to="staking" />}
            <ConnectWallet />
          </Route>
          {/* {isWalletConnected && <Route exact path="/farming" component={Farming} />} */}
          {isWalletConnected && <Route exact path="/staking" component={Staking} />}
          <Route path={["/farming", "/social-tokens", "/forward-chain", "/forward-id", "/forward-pay", "/forward-factory"]} component={ComingSoon} />
          <Route path="*" component={ConnectWallet} />
        </Switch>
      </DashboardLayout>
    </>
  );
}

export default App;
