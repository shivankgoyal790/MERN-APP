import React, { useCallback, useState } from "react"
import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";
import Users from "./Users/Users";
import MainNavigation from "./Shared/Components/MainNavigation";
import Auth from "./Shared/Auth"
import Places from "./Places/Myplaces/Places";
import Addplaces from "./Places/Addplaces/Addplaces";
import { Authcontext } from "./Shared/Context/Authcontext";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Authcontext.Provider value={ {isLoggedIn:isLoggedIn , login:login , logout:logout }}>
    <Router>
      <MainNavigation />
      <Switch>
          <Route path="/" exact><Users /></Route>
          <Route path="/:userid/myplaces" exact><Places /></Route>
          <Route path="/myplaces/new" exact><Addplaces /></Route>
          <Route path="/Auth" exact><Auth /></Route>
          <Redirect to="/" />
      </Switch>
    </Router>
  </Authcontext.Provider>
  );
}

export default App;
