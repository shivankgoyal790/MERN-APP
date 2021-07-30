import React from "react"
import "./Errormodel.css"

const Errormodel = (props) =>{

    return(
            <div className="error-model-container" style={{display: props.show ? "block" : "none"}}>
                <p> {props.error}</p>
                <button className="error-model-btn" onClick={props.onClick}>close</button>
            </div>
    
    )
}

export default Errormodel;