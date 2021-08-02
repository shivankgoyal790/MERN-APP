import React, { useContext } from "react"
import "./Navlinks.css"
import  {NavLink}  from "react-router-dom"
import { Authcontext } from "../Context/Authcontext"
const Navlinks = () =>{
    const Auth = useContext(Authcontext);
    const logouthandler = () =>{
        Auth.logout();
    }
    return(
        <ul className="navlist">
        <li> <NavLink to="/" >ALL USERS</NavLink></li>
        {Auth.isLoggedIn && (
        <li> <NavLink to={`/${Auth.userId}/myplaces`}>MY PLACES</NavLink></li>)}
        {Auth.isLoggedIn && (
         <li><NavLink to="/myplaces/new">ADD PLACES</NavLink></li>)}
         {!Auth.isLoggedIn && (   
         <li><NavLink to="/auth">LOGIN/SIGNUP</NavLink></li>)}  
        {Auth.isLoggedIn && (
         <li><NavLink to="/" onClick={logouthandler}>LOG OUT</NavLink></li>)}
        </ul>

    );
}
export default Navlinks;