import React from "react"
import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";
import Users from "./Users/Users";
import MainNavigation from "./Shared/Components/MainNavigation";
import Auth from "./Shared/Auth"
import Places from "./Places/Myplaces/Places";
import Addplaces from "./Places/Addplaces/Addplaces";
function App() {
  return (

    <Router>
      <MainNavigation />
      <Switch>
          <Route path="/" exact><Users /></Route>
          <Route path="/u1/myplaces" exact><Places /></Route>
          <Route path="/myplaces/new" exact><Addplaces /></Route>
          <Route path="/Auth" exact><Auth /></Route>
          <Redirect to="/" />
      </Switch>
    </Router>
  
  );
}

export default App;
