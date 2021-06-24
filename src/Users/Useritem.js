import React from "react"
import "./Useritem.css"

const Useritem = (props) =>{
    return(
            
                <div className="user-container">
                    <div className="userimage">
                        <img src={props.userimg} alt="user" />
                    </div>
                    <div className="info">
                        <h2>{props.uname}</h2>
                        <h3>{props.placeCount === 1 ? 'Place' : 'Places'} {props.placeCount} </h3>
                    </div>
                </div>
           
    );
}

export default Useritem
