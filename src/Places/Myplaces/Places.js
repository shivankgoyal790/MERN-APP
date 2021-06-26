import React, { useState } from "react"
import "./Places.css"
import Logo1 from "../../Shared/images/Sydney_Opera_House_Front_angle (1).jpg"
import Backdrop from  "../../Shared/Components/Backdrop"
import Modal from "../../Shared/Modal/Modal"

const Places = () =>{

    const[showmodal , setshowmodal ] = useState(false);
    const closeMapHandler = () =>{
        setshowmodal(false);
    }

    const OpenMapHandler = () =>{
        setshowmodal(true);
    }

    return(
        <>
          
        <div className="place-container">
            <div className="image-container">
                <img src={Logo1} alt="building" />
            </div>
            <h1 className="country">Sydney</h1>
            <h2 className="building">opera house</h2>
            <h3 className="map-details">map details</h3>
            <br></br>
            <button className="btn1" onClick={OpenMapHandler}>View Map</button>
            <button className="btn1">Edit</button>
            <button className="btn1">Delete</button>
            {showmodal && <Backdrop onClick={closeMapHandler}/>}
            <Modal show={showmodal} location="hi there" onClick={closeMapHandler}/>  
        </div>
        </>
    );
}

export default Places;