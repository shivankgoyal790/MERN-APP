import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Authcontext } from "../../Shared/Context/Authcontext";
import { useContext } from "react";
import { useHistory } from "react-router";
const Updateplaces = () =>{
    const pid = useParams().pid;
    const Auth = useContext(Authcontext);
    const [Newvalue , ChangeNewvalue ] = useState({
            title: "",
            description : "",
            location : ""}
        )
    const history = useHistory();    
      

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
             if(name === "description")
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
      const Updateplacehandler = async event => {
        event.preventDefault();
        try {
          await fetch(
            `http://localhost:5000/api/${pid}`,{
            method :'PATCH',
            headers : {'Content-Type' : 'application/json'}, 
            body : JSON.stringify({
              title: Newvalue.title,
              description: Newvalue.description,
              location : Newvalue.location
            }),
        });
        history.push('/' + Auth.userId + '/myplaces');
        console.log(history);
        }
     catch (err) {}
      };
    


    return(
            <div className="addplace-container">

           <label htmlFor="title">Title:</label>
           <input 
                type="text" 
                className="contry" 
                name="title" 
                placeholder="Enter title" 
                onChange ={InputHandler} 
                value={Newvalue.Country}
            />

           <label htmlFor="description">Description</label>
           <input 
                type="text" 
                name="description" 
                placeholder="Enter Description"
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
           <button type="submit" className="btn" onClick={Updateplacehandler}>EDIT PLACE</button>
           </div>
        
    );

}

export default Updateplaces;
