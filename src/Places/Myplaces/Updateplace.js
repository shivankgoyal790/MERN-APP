import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react";
// import { Authcontext } from "../../Shared/Context/Authcontext";
// import { useContext } from "react";
const Updateplaces = () =>{

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


    const Updateplacehandler = () =>{

        useEffect( ()=>{
            const Updatemyplace = async () =>{  
                const pid = useParams().pid;
                const response = await fetch(`http://localhost/api/${pid}`,{
                    method :"PATCH",
                    headers :{'Content-Type' : 'application/json'}, 
                    body : JSON.stringify({
                    
                        title : Newvalue.country,
                        description : Newvalue.address,
                        address : Newvalue.address,
                        location : Newvalue.location, 
                        
            }),
                });
                const responsedata = response.json;
            }
            Updatemyplace();
        } , []);
    }


    return(
            <div className="addplace-container">

           <label htmlFor="country">Country:</label>
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
                placeholder="Enter Location"
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
           <button type="submit" className="btn" onClick={Updateplacehandler}>EDIT PLACE</button>
           </div>
        
    );

}

export default Updateplaces;
