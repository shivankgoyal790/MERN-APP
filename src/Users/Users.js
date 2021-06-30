import React from "react"
import Userlist from "./Userlist"
import Logo1 from "../Shared/images/avatar.png"

const Users = () =>{
    const Myusers = [
     {
        id: "u1",
        username : "shivank goyal",
        places : 3,
        userimage : Logo1
     },
     {
        id: "u2",
        username : "sheena goyal",
        places : 1,
        userimage : Logo1
     }
    ]
    
    return(
        <Userlist items = {Myusers}/>
    );
}
export default Users;