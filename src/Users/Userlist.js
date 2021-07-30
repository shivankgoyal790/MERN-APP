import React from "react"
import "./Userlist.css"
import Useritem from "./Useritem"
const Userlist = (props) =>{
    if (props.items.length === 0) {
        return (
          <div className="center">
              <h2>No users found.</h2>
          </div>
        );
      }
    
    return(
        <ul className="backr">
         {props.items.map(curr =>(
             <Useritem 
             key= {curr.id}
             uname= {curr.name}
                 placeCount = {curr.places.length}
             userimg = {curr.userimage} />
         ))
         }
        </ul>
    );
}

export default Userlist;