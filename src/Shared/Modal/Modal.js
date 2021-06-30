import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css"
import Logo1 from "../images/google-map.jpg"
const Modal = (props) =>{
    return ReactDOM.createPortal(
            <div className="modal-container" style={{display : props.show ? "block" : "none" }}>
                <h1 className="modal-header">{props.location}</h1>
                <div className="map-container">
                    <img src={Logo1} alt="map" className="map-image"/>
                    <button className="map-button" onClick={props.onClick}>CLOSE</button>
                </div>
            </div>,document.getElementById("modal-hook"));
}
    
export default Modal