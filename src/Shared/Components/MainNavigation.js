import React, { useState } from "react"
import "./MainNavigation.css"
import Navlinks from "./Navlinks"
import { Link } from "react-router-dom"
import Sidedrawer from "./Sidedrawer"

const MainNavigation = () =>{
    const[visible ,setvisible] = useState(true);
    
    const toggledisplay = () =>{
        if(visible === true)
            setvisible(false);
        else
            setvisible(true);    
    }
    const setdisplay = () =>{
        if(window.innerWidth > 767){
            setvisible(true);
        }
    }
    window.addEventListener('resize' , setdisplay)
    return (
        <>
        <h1 className="header">
            <span className="applogo"><Link to="/">Share-Places</Link></span>
            <span className="links"><Navlinks /></span>
            <span className="menubar" onClick={toggledisplay}>
            <div></div>
            <div></div>
            <div></div>
            </span> 
        </h1>
        <div style={{display: visible ? "none" : "block"}}>
        <Sidedrawer />
        </div>
        </>
    );
}

export default MainNavigation