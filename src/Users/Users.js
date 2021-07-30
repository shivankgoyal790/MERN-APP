import React, { useState } from "react"
import Userlist from "./Userlist"
// import Logo1 from "../Shared/images/shiva.jpg"
// import Logo2 from "../Shared/images/sheena.jpg"
import { useEffect } from "react"
import Loadingscreen from "../Shared/Components/Loadingscreen"

    // const Myusers = [
    //  {
    //     id: "u1",
    //     username : "shivank goyal",
    //     places : 3,
    //     userimage : Logo1
    //  },
    //  {
    //     id: "u2",
    //     username : "sheena goyal",
    //     places : 1,
    //     userimage : Logo2
    //  }
    // ]

const Users = () =>{
    const [isloading , setisloading] = useState(false);
    // const [error ,seterror] = useState();
    const [userdata , setuserdata] = useState();    
    
    useEffect( () => {

            const sendrequest = async () =>{

                try{
                setisloading(true);
                const response = await fetch("http://localhost:5000/users");
                const responsedata = await response.json();
                if(!response.ok){
                    // seterror("cannot find");
                    setisloading(false);
                    throw new Error(responsedata.message);
                    }
                    setisloading(false);
                setuserdata(responsedata.users); 
               
                }
                catch(err){
                    console.log(err);
                    console.log("cannot get users");
                    setisloading(false);
                }
                setisloading(false)
            }   
                
            sendrequest();
            
            },[]);
            // const errorhandler = () =>{
            //     seterror(null);
            // }
    return(
        <>
        {isloading && ( <div style={{width:"100px" ,margin: "auto"}}><Loadingscreen /></div>)}
        {!isloading && userdata && <Userlist items = {userdata}/>}
        </>
    );
}
export default Users;