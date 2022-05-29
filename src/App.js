import { Switch, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/*Switch stops as soon as it matches first URL*/}
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
