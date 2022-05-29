import { Switch, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Nav from "./components/Nav";
import GlobalStyle from "./components/GlobalStyle";
import WeatherDashboard from "./pages/WeatherDashboard";
import Footer from "./components/Footer";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      {/*Switch stops as soon as it matches first URL*/}
      <Switch location={location} key={location.pathname}>
        <Route path="/city/:id" exact>
          <WeatherDashboard />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
