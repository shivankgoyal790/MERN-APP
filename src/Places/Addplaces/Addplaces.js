import React, { useState } from "react"
import { Authcontext } from "../../Shared/Context/Authcontext";
import { useContext } from "react";
import "./Addplaces.css"

const Addplaces = () =>{
    const Authentication = useContext(Authcontext);
    const [Newvalue , ChangeNewvalue ] = useState({
            title: "",
            description : "",
            location : ""}
        )

    const InputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        ChangeNewvalue((prev) =>{
            if(name === "title")
             {return{
                title : value,
                description : prev.description,
                location : prev.location
             }}
             if(name === "building")
             {return{
                title : prev.title,
                description : value,
                location : prev.location
             }}
             if(name === "map")
             {return{
                title : prev.title,
                description : prev.description,
                location : value
             }}
        });

    }


        const Addplacehandler = async () =>{
            
            try{
            const response = await fetch( "http://localhost:5000/api/createplace", {
            method : "POST",
            headers : {'Content-Type' : 'application/json'}, 
            body : JSON.stringify({
               
                title : Newvalue.title,
                description : Newvalue.description,
                location : Newvalue.location,
                creator : Authentication.userId 
                
            }),
          
        }); 
        const responsedata = response.json();
        console.log(response.body.creator,"hi");
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
          
           <label htmlFor="title">Title:</label>
           <input 
                type="text" 
                className="contry" 
                name="title" 
                placeholder="Enter title" 
                onChange ={InputHandler} 
                value={Newvalue.Country}
            />

           <label htmlFor="building">Description</label>
           <input 
                type="text" 
                name="building" 
                placeholder="Enter Place description"
                onChange ={InputHandler} 
                value={Newvalue.description} 
              

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