import React from "react"
import "./Places.css"
import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"

const Places = () =>{
    return(
        <div className="place-container">
            <div className="image-container">
                <img src={Logo1} alt="building" />
            </div>
            <h1 className="country">Sydney</h1>
            <h2 className="building">opera house</h2>
            <h3 className="map-details">map details</h3>
            <br></br>
            <button className="btn1" inverse>View Map</button>
            <button className="btn1">Edit</button>
            <button className="btn1">Delete</button>
        </div>
    );
}

export default Places;