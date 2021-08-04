import React, { useContext, useState } from "react"
import "./Placeitem.css"
import Backdrop from  "../../Shared/Components/Backdrop"
import Modal from "../../Shared/Modal/Modal"
import Logo2 from "../../Shared/images/taj.jpg";
import {Authcontext} from "../../Shared/Context/Authcontext" 
import { Link } from "react-router-dom";

const Placeitem = (props) =>{

    const[showmodal , setshowmodal ] = useState(false);
    const closeMapHandler = () =>{
        setshowmodal(false);
    }

    const OpenMapHandler = () =>{ 
        setshowmodal(true);
    }
    const Auth = useContext(Authcontext);

    const deleteplacehandler = async () =>{
        try{

            await fetch(`http://localhost:5000/api/${props.id}`,{
                method :'DELETE',
                headers : {'Content-Type' : 'application/json'} }
                );
                props.ondelete(props.id);
        } catch(err){
            console.log(err);
        }   
    }

    return(
        <>
          
        <div className="place-container">
            <div className="image-container">
                <img src={Logo2} alt="building" />
            </div>
            <h1 className="country">{props.title}</h1>
            <h2 className="building">{props.description}</h2>
            <h3 className="map-details">{props.location}</h3>
            <br></br>
            <div className="btn-container">
            <button className="btn1" onClick={OpenMapHandler}>View Map</button>
            {Auth.isLoggedIn && 
            <button className="btn1"><Link to={`/updateplaces/${props.id}`}>Edit</Link></button>}
            {Auth.isLoggedIn &&
            <button className="btn1" onClick={deleteplacehandler}>Delete</button>}
            </div>
 
        </div>
        {showmodal && <Backdrop onClick={closeMapHandler}/>}
            <Modal show={showmodal} location={props.address} onClick={closeMapHandler}/> 
        </>
    );
}

export default Placeitem;