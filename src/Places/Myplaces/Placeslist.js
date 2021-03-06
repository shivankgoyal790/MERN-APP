import React from "react"
import Placeitem from "./Placeitem"
const Placeslist = (props) =>{
    if (props.items.length === 0) {
        return (
          <div className="center">
              <h2>No places found.</h2> 
          </div>
        );
      }
    
    return(
        <div>
         {props.items.map(curr =>(
             <Placeitem 
             key= {curr.id}
             id = {curr.id}
             title = {curr.title}
             image= {curr.image}
             description = {curr.description}
             creator = {curr.creator}
             location = {curr.location}
             ondelete = {props.ondeleteplace}
              />
         ))
         }
        </div>
    );
}

export default Placeslist;