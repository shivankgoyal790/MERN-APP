import React, { useState } from "react"
import Backdrop from "./Backdrop"
import "./Errormodel.css"

const Errormodel = (props) =>{
    const [isopen ,setisopen] = useState(true);
    
    const openhandler = () =>{
        if(isopen){
            setisopen(false);
        }
    }
    
    return(
    <>
    {isopen && <Backdrop onclick={openhandler}/>}
    <div style = {{display:props.disp}} className="errorbackground">
    <div className="message">
        <p>{props.text}</p>
    </div>
    </div>
    </>
    );

}

export default Errormodel;