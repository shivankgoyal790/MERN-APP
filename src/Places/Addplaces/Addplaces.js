import React, { useState } from "react"
import "./Addplaces.css"

const Addplaces = () =>{

    const [Newvalue , ChangeNewvalue ] = useState({
            country: "",
            address : "",
            location : ""}
        )

    const InputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        ChangeNewvalue((prev) =>{
            if(name === "country")
             {return{
                country : value,
                address : prev.address,
                location : prev.location
             }}
             if(name === "building")
             {return{
                country : prev.country,
                address : value,
                location : prev.location
             }}
             if(name === "map")
             {return{
                country : prev.country,
                address : prev.address,
                location : value
             }}
        });
    }
   return(
           <div className="addplace-container">
           <h2>Please Upload Your file:</h2>
           <input 
                type="file" 
                id="myFile" 
                name="filename" 
                className="choose-file" 
            />
           <label htmlFor="myfile" className="label">choose file</label>
           <br></br>
           <br></br>
          
           <label htmlFor="contry">Country:</label>
           <input 
                type="text" 
                className="contry" 
                name="country" 
                placeholder="Enter country" 
                onChange ={InputHandler} 
                value={Newvalue.Country}
            />

           <label htmlFor="building">Building Name Or Address:</label>
           <input 
                type="text" 
                name="building" 
                placeholder="enter Location"
                onChange ={InputHandler} 
                value={Newvalue.address} 
              

            />
           <label htmlFor="map">Location:</label>
           <input 
                type="text" 
                name="map" 
                placeholder="Enter Map location"
                onChange ={InputHandler} 
                value={Newvalue.location}    
                />
           <button type="submit" className="btn">ADD PLACE</button>
           </div>
        
    );

}

export default Addplaces;