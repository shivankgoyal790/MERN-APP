import React from "react"
import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";
import Users from "./Users/Users";
import NewPlace from "./Places/Newplace";
import MainNavigation from "./Shared/Components/MainNavigation";
import Auth from "./Shared/Auth"
function App() {
  return (

    <Router>
      <MainNavigation />
      <Switch>
          <Route path="/" exact><Users /></Route>
          <Route path="/myplaces/new" exact><NewPlace /></Route>
          <Route path="/Auth" exact><Auth /></Route>
          <Redirect to="/" />
      </Switch>
    </Router>
  
  );
}

export default App;
