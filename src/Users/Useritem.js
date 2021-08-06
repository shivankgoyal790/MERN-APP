import React from "react"
import "./Useritem.css"
import { Link } from "react-router-dom"
// import Logo1 from "../Shared/images/shiva.jpg"
const Useritem = (props) =>{
    
    
    return(

            <Link to={`/${props.userId}/myplaces`}>
                <div className="user-container">
                    <div className="userimage">
                        <img src={props.userimg} alt="user" />
                    </div>
                    <div className="info">
                        <h2>{props.uname}</h2>
                        <h3>{props.placeCount < 2 ? 'Place' : 'Places'} {props.placeCount} </h3>
                    </div>
                </div>
           </Link>
    );
}

export default Useritem
