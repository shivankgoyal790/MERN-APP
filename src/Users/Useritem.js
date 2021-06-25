import React from "react"
import "./Useritem.css"
import { Link } from "react-router-dom"
const Useritem = (props) =>{
    return(

            <Link to="/u1/myplaces">
                <div className="user-container">
                    <div className="userimage">
                        <img src={props.userimg} alt="user" />
                    </div>
                    <div className="info">
                        <h2>{props.uname}</h2>
                        <h3>{props.placeCount === 1 ? 'Place' : 'Places'} {props.placeCount} </h3>
                    </div>
                </div>
           </Link>
    );
}

export default Useritem
