import React, { useState } from "react"
import { Authcontext } from "../../Shared/Context/Authcontext";
import { useContext } from "react";
import "./Addplaces.css"

const Addplaces = () =>{
    const Authentication = useContext(Authcontext);
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


        const Addplacehandler = async () =>{
            
            try{
            const response = await fetch( "http://localhost:5000/api/createplaces", {
            method : "POST",
            headers : {'Content-Type' : 'application/json'}, 
            body : JSON.stringify({
                title : Newvalue.country,
                description : Newvalue.address,
                address : Newvalue.address,
                location : Newvalue.location,
                creator : Authentication.uid
            }),
          
        }); 
        const responsedata = response.json();
        if(!response.ok){
            throw new Error(responsedata.message);
        }
        console.log(responsedata);
        }catch(err){
            console.log(err || "cannot create place");
        }

       
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
           <button type="submit" className="btn" onClick={Addplacehandler}>ADD PLACE</button>
           </div>
        
    );

}

export default Addplaces;