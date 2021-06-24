import React from "react"
import "./Sidedrawer.css"

const Sidedrawer = () =>{
   return(
            <div className="sidebackground">
                <div className="drawer">
                    <div className="drawerlist">
                        <div className="drawernav">USERS</div>
                        <div className="drawernav">PLACES</div>
                        <div className="drawernav">ADD PLACES</div>
                        <div className="drawernav">LOGIN/SIGNUP</div>
                    </div>
                </div>
            </div>
   ) ;   
}

export default Sidedrawer;