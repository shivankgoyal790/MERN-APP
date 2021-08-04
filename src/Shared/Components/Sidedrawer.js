import React from "react"
import ReactDOM from "react-dom"
import "./Sidedrawer.css"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { Authcontext } from "../Context/Authcontext"
const Sidedrawer = (props) =>{
    const Auth = useContext(Authcontext);
   return ReactDOM.createPortal(
                <div className="drawer" style={{display:props.show ? "block" : "none"}} onClick={props.onClick}>
                    <div className="drawerlist">
                        <div className="drawernav"><Link to="/">USERS</Link></div>
                        {Auth.isLoggedIn &&
                        <div className="drawernav"><Link to={`/${Auth.userId}/myplaces`}>MY PLACES</Link></div>}
                        {Auth.isLoggedIn &&
                        <div className="drawernav"><Link to="/myplaces/new">ADD PLACES</Link></div>}
                        <div className="drawernav"><Link to="/auth">LOGIN/SIGNUP</Link></div>
                    </div>
                </div>,document.getElementById('sidedrawer-hook')
               
   );   
}

export default Sidedrawer;