import React from "react"
import "./Navlinks.css"
import  {NavLink}  from "react-router-dom"
const Navlinks = () =>{
    return(
        <ul className="navlist">
        <li> <NavLink to="/" >ALL USERS</NavLink></li>
        <li> <NavLink to="/u1/myplaces">MY PLACES</NavLink></li>
         <li><NavLink to="/myplaces/new">ADD PLACES</NavLink></li>   
         <li><NavLink to="/auth">LOGIN/SIGNUP</NavLink></li>   
        </ul>

    );
}
export default Navlinks;