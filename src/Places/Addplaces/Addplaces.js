import React from "react"
import "./Addplaces.css"

const Addplaces = () =>{
    return(
           <div className="addplace-container">
           <h2>Please Upload Your file:</h2>
           <input type="file" id="myFile" name="filename" className="choose-file" />
           <label for="myfile" className="label">choose file</label>
           <br></br>
           <br></br>
           <label htmlFor="contry">Country:</label>
           <input type="text" className="contry" name="country" placeholder="Enter country"/>
           <label htmlFor="building">Building Name Or Address:</label>
           <input type="text" name="building" placeholder="enter Location"/>
           <label htmlFor="map">Location:</label>
           <input type="text" name="map" placeholder="Enter Map location"/>
           <button type="submit" className="btn">ADD PLACE</button>
           </div>
        
    );

}

export default Addplaces;