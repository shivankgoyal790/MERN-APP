import React, {useContext, useState } from "react"
import "./Auth.css"
import { validate, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../Shared/Util/validators';
import {
    VALIDATOR_EMAIL
  } from '../Shared/Util/validators';
import { Authcontext } from "./Context/Authcontext";
import Loadingscreen  from "./Components/Loadingscreen";

const Auth = () =>{

    const [Newvalue , ChangeNewvalue] = useState({username : "" , email :"" ,password : ""});
    const [Isvalid , setIsvalid] = useState(true);
    const [passvalid , setpassvalid] = useState(true);
    const [uservalid , setuservalid] = useState(true);
    const [IsLogin , setLogin] = useState(true);
    const [isloading , setisloading] = useState(false);
    const [error , seterror] = useState();
    const Authentication = useContext(Authcontext);


    const InputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        ChangeNewvalue((prev) =>{
            if(name === "username")
             {return{
                username : value,
                email : prev.email,
                password : prev.password
             }}
             if(name === "email")
             {return{
                username : prev.username,
                email : value,
                password : prev.password
             }}
             if(name === "password")
             {return{
                username : prev.username,
                email : prev.email,
                password : value
             }}
        });
    }
    
    const ChangeAuthHandler = (event) =>{
        setuservalid(true);
        setpassvalid(true);
        setIsvalid(true);
        ChangeNewvalue( {username: "" ,email:"" , password:"" });
            if(IsLogin === true)
            setLogin(false);
            else
            setLogin(true);
            }

    const onSubmitHandler = async (event) =>{
        event.preventDefault(); 
        setuservalid(true);
        setpassvalid(true);
        setIsvalid(true);        
        const valid1 = validate( Newvalue.email , [VALIDATOR_EMAIL()]);
        const valid2 = validate (Newvalue.password , [VALIDATOR_MINLENGTH(5)])
        const valid3 = validate (Newvalue.username , [VALIDATOR_REQUIRE()])

        if(!valid1){    
        setIsvalid(false);
        }        
        if(!valid2){
            setpassvalid(false);
        }        
        if(!valid3){
            setuservalid(false);
        }
        if(IsLogin){
            console.log("hi");
            setisloading(true);
            try {
            const response = await fetch("http://localhost:5000/users/login",{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'}, 
                body : JSON.stringify({
                    email : Newvalue.email,
                    password : Newvalue.password
                }),
            });  

            const responsedata = await response.json();
            console.log(response.ok);
            if(!response.ok){
                seterror("cannot find");
                throw new Error(responsedata.message);
            }
            setisloading(false); 
            Authentication.login();
        }
        catch(err){
            console.log(err);
            setisloading(false);
            seterror(err.message || "something went wrong");   
        }

        }
        else{
            console.log("bye");
            setisloading(true);
            try {
            const response = await fetch("http://localhost:5000/users/signup",{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'}, 
                body : JSON.stringify({
                    name : Newvalue.username,
                    email : Newvalue.email,
                    password : Newvalue.password
                }),
            });  

            const responsedata = await response.json();
            console.log(response.ok);
            if(!response.ok){
                seterror("cannot find");
                throw new Error(responsedata.message);
            }
            console.log(responsedata);
            setisloading(false); 
            Authentication.login();
        }
        catch(err){
            console.log(err);
            setisloading(false);
            seterror(err.message || "something went wrong");   
        }

        }
        


        // if(IsLogin){
        // if(valid1 && valid2){
        //      alert("YOUR ARE NOW LOGGED IN");}
        // }
        
        // else if( !IsLogin){
        //      if(valid1 && valid2 && valid3){
        //         alert("YOU ARE NOW LOGGED IN");}
        // }     


    }    
    
    return(
        <div className="auth-container">
        {isloading && <Loadingscreen asOverlay/>}
            <h1 className="authlogo">Share-Places</h1>
            <p>Join The Journey</p>
            <form onSubmit={onSubmitHandler}>
                <span style={{display : IsLogin ? "none" : "block"}}>
                    <label className="mylabel" htmlFor="username">
                    Username {!uservalid && <p className="error">*please enter a name</p> }
                    </label>
                    <input 
                        type="text" 
                        className="authinput" 
                        name="username"
                        onChange = {InputHandler}
                        value={Newvalue.username}
                        placeholder="Enter Your Name">
                    </input>
                </span>
            
            
                    <label className="mylabel" htmlFor="email">E-mail {!Isvalid && <p className="error">*please enter a valid email</p> }</label>
                    <input 
                        type="text" 
                        className="authinput" 
                        name="email"
                        onChange = {InputHandler}
                        value={Newvalue.email}
                        placeholder="Enter Your Email">
                    </input>
           
           
                    <label className="mylabel" htmlFor="password">Password {!passvalid && <p className="error">*Please enter a valid password, at least 5 characters."</p>}</label>
                    <input  
                        type="password"
                        className="authinput" 
                        name="password"
                        value={Newvalue.password}
                        onChange = {InputHandler}    
                        placeholder="Enter Password">
                    </input>

                    <button type="submit" className="authbutton">{IsLogin ? "Log In" : "Sign Up"}</button>
                    
                    <p className="toggle"> {IsLogin ? "Don't" : "Already"} have an account?
                
                    <span onClick={ChangeAuthHandler} className="switch"> {IsLogin ? "SignUp" : "Login"} </span></p>
            </form>

        </div>
    );
}
export default Auth;