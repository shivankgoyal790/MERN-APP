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
             building = {curr.building}
             imgUrl= {curr.imgUrl}
             statename = {curr.statename}
             creator = {curr.creator}
             address = {curr.address}
              />
         ))
         }
        </div>
    );
}

export default Placeslist;