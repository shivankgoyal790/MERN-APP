import React from "react"
import ReactDOM from "react-dom"
import "./Sidedrawer.css"
import {Link} from "react-router-dom"
const Sidedrawer = (props) =>{
   return ReactDOM.createPortal(
                <div className="drawer" style={{display:props.show ? "block" : "none"}} onClick={props.onClick}>
                    <div className="drawerlist">
                        <div className="drawernav"><Link to="/">USERS</Link></div>
                        <div className="drawernav"><Link to="/u1/myplaces">PLACES</Link></div>
                        <div className="drawernav"><Link to="/myplaces/new">ADD PLACES</Link></div>
                        <div className="drawernav"><Link to="/auth">LOGIN/SIGNUP</Link></div>
                    </div>
                </div>,document.getElementById('sidedrawer-hook')
               
   );   
}

export default Sidedrawer;