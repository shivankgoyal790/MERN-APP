import React, { useState } from "react"
import { Authcontext } from "../../Shared/Context/Authcontext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { useCallback } from "react";
import "./Addplaces.css"
import Loadingscreen from "../../Shared/Components/Loadingscreen"
import Imageupload from "../../Shared/Components/Imageupload";

const Addplaces = () =>{
    const Authentication = useContext(Authcontext);
    const history = useHistory();
    const [isLoading,setisloading] = useState(false);
    const [Newvalue , ChangeNewvalue ] = useState({
            title: "",
            description : "",
            image : undefined,
            location : ""}
        )
        const inputimagehandler = useCallback((value) => {
            ChangeNewvalue((prev)=>{
    
                return{
                   
                    title : prev.title,
                    description : prev.description,
                    image : value,
                    location : prev.location
                }
            }
            );
        },[])
    const InputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        ChangeNewvalue((prev) =>{
            if(name === "title")
             {return{
                title : value,
                description : prev.description,
                location : prev.location,
                image : prev.image
             }}
             if(name === "building")
             {return{
                title : prev.title,
                description : value,
                location : prev.location,
                image : prev.image
             }}
             if(name === "map")
             {return{
                title : prev.title,
                description : prev.description,
                location : value,
                image : prev.image
             }}
        });

    }


        const Addplacehandler = async () =>{
            
            try{
            setisloading(true);
            const formdata = new FormData();
            formdata.append('title',Newvalue.title);
            formdata.append('description',Newvalue.description);
            formdata.append('image',Newvalue.image);
            formdata.append('location',Newvalue.location);
            formdata.append('creator',Authentication.userId);
            const response = await fetch( "http://localhost:5000/api/createplace", {
            method : "POST",
            // headers : {'Content-Type' : 'application/json'}, 
            // body : JSON.stringify({
            //     image : Newvalue.image,
            //     title : Newvalue.title,
            //     description : Newvalue.description,
            //     location : Newvalue.location,
            //     creator : Authentication.userId 
                
            // }),
            body : formdata
          
        }); 
        console.log(formdata.entries.image);
        const responsedata = response.json();
        if(!response.ok){
            throw new Error(responsedata.message);
        }
        console.log(responsedata);
        history.push('/' + Authentication.userId + '/myplaces');
        setisloading(false);
        }catch(err){
            setisloading(false);
            console.log(err || "cannot create place");
        }

       
    }

   return(
       <>
       {isLoading && ( <div style={{width:"100px" ,margin: "auto"}}><Loadingscreen /></div>)}
           <div className="addplace-container">
           <h2>Please Upload Your place:</h2>
           <Imageupload id="image" name="image" oninput={inputimagehandler}/>
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
           </>
        
    );

}

export default Addplaces;