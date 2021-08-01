import React, { useContext, useState } from "react"
import "./Placeitem.css"
import Backdrop from  "../../Shared/Components/Backdrop"
import Modal from "../../Shared/Modal/Modal"
import Logo2 from "../../Shared/images/taj.jpg";
import {Authcontext} from "../../Shared/Context/Authcontext" 

const Placeitem = (props) =>{

    const[showmodal , setshowmodal ] = useState(false);
    const closeMapHandler = () =>{
        setshowmodal(false);
    }

    const OpenMapHandler = () =>{ 
        setshowmodal(true);
    }
    const Auth = useContext(Authcontext);

    return(
        <>
          
        <div className="place-container">
            <div className="image-container">
                <img src={Logo2} alt="building" />
            </div>
            <h1 className="country">{props.statename}</h1>
            <h2 className="building">{props.building}</h2>
            <h3 className="map-details">{props.address}</h3>
            <br></br>
            <div className="btn-container">
            <button className="btn1" onClick={OpenMapHandler}>View Map</button>
            {Auth.isLoggedIn &&
            <button className="btn1">Edit</button>}
            {Auth.isLoggedIn &&
            <button className="btn1">Delete</button>}
            </div>
 
        </div>
        {showmodal && <Backdrop onClick={closeMapHandler}/>}
            <Modal show={showmodal} location={props.address} onClick={closeMapHandler}/> 
        </>
    );
}

export default Placeitem;