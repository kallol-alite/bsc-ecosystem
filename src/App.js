import DashboardLayout from './components/layout/DashboardLayout'
import{Routes,Route,Router} from 'react-router';
import Staking from'./components/Staking';
function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <DashboardLayout />        
        {/* <Routes>             
          <Route path='/staking' component={Staking} />               
        </Routes>
      </DashboardLayout> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
