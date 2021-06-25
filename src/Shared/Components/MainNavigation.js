import React, { useState } from "react"
import "./MainNavigation.css"
import Navlinks from "./Navlinks"
import { Link } from "react-router-dom"
import Sidedrawer from "./Sidedrawer"
import Backdrop from "./Backdrop"

const MainNavigation = () =>{
    const[drawerIsOpen ,setDrawerIsOpen] = useState(false);
    const closeDrawerHandler = () =>{
        setDrawerIsOpen(false);
    }

    const OpendrawerHandler = () =>{
        setDrawerIsOpen(true);
    }
    return (
        <>
          {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <Sidedrawer show={drawerIsOpen} onClick={closeDrawerHandler} />       
        <h1 className="header">
            <span className="applogo"><Link to="/">Share-Places</Link></span>
            <span className="links"><Navlinks /></span>
            <span className="menubar" onClick={OpendrawerHandler}>
            <div></div>
            <div></div>
            <div></div>
            </span> 
        </h1>
        </>
    );
}

export default MainNavigation