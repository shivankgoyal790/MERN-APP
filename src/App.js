import React, { useCallback, useState ,Suspense} from "react"
import { BrowserRouter as Router, Route , Switch, Redirect } from "react-router-dom";
// import Users from "./Users/Users";
import MainNavigation from "./Shared/Components/MainNavigation";
// import Auth from "./Shared/Auth"
// import Places from "./Places/Myplaces/Places";
// import Addplaces from "./Places/Addplaces/Addplaces";
// import Updateplaces from "./Places/Myplaces/Updateplace";
import { Authcontext } from "./Shared/Context/Authcontext";


const Users = React.lazy(() => import("./Users/Users.js"));
const Auth = React.lazy(()=> import("./Shared/Auth"));
const Places = React.lazy(()=> import("./Places/Myplaces/Places"));
const Addplaces = React.lazy(() =>import("./Places/Addplaces/Addplaces"));
const Updateplaces = React.lazy(()=>import("./Places/Myplaces/Updateplace"));
const App = () => {

  // without web tokens
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ userId , setuserId] = useState(false);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setuserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
  }, []);
  return (
    <Authcontext.Provider value={ {isLoggedIn:isLoggedIn ,userId : userId, login:login , logout:logout }}>
    <Suspense>
    <Router>
      <MainNavigation />
      <Switch>
          <Route path="/" exact><Users /></Route>
          <Route path="/:userid/myplaces" exact><Places /></Route>
          <Route path="/updateplaces/:pid"><Updateplaces/></Route>
          <Route path="/myplaces/new" exact><Addplaces /></Route>
          <Route path="/Auth" exact><Auth /></Route>
          <Redirect to="/"/>
      </Switch>
    </Router>
    </Suspense>
  </Authcontext.Provider>
  );
}


  // const [token, settoken] = useState(null)
  // const [ userId , setuserId] = useState(false);
  // const login = useCallback((uid,token) => {
  //   settoken(token);
  //   setuserId(uid);
  // }, []);

  // const logout = useCallback(() => {
  //   settoken(null);
  //   setuserId(null);
  // }, []);
  // return (
  //   <Authcontext.Provider value={ {isLoggedIn:!!token,token:token ,userId : userId, login:login , logout:logout }}>
  //   <Router>
  //     <MainNavigation />
  //     <Switch>
  //         <Route path="/" exact><Users /></Route>
  //         <Route path="/:userid/myplaces" exact><Places /></Route>
  //         <Route path="/updateplaces/:pid"><Updateplaces/></Route>
  //         <Route path="/myplaces/new" exact><Addplaces /></Route>
  //         <Route path="/Auth" exact><Auth /></Route>
  //         <Redirect to="/"/>
  //     </Switch>
  //   </Router>
  // </Authcontext.Provider>
  // );

export default App;
