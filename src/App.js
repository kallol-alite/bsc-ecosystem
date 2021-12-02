import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DashboardLayout from "./component/Layouts/DashboardLayout";

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
          <Route exact path="/staking">Staking</Route>
          <Route exact path="/farming">Farming</Route>
        </DashboardLayout>
      </Switch>
    </>
  );
}

export default App;
