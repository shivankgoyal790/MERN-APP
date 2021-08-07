import React, {useContext, useState } from "react"
import "./Auth.css"
import { validate, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../Shared/Util/validators';
import {
    VALIDATOR_EMAIL
  } from '../Shared/Util/validators';
import { Authcontext } from "./Context/Authcontext";
import Loadingscreen  from "./Components/Loadingscreen";
import Backdrop from "../Shared/Components/Backdrop";
import Errormodel from "./Components/Errormodel";
import Imageupload from "./Components/Imageupload";
import { useHistory } from "react-router";
import { useCallback } from "react";

const Auth = () =>{

    const [Newvalue , ChangeNewvalue] = useState({image: undefined ,username : "" , email :"" ,password : ""});
    const [Isvalid , setIsvalid] = useState(true);
    const [passvalid , setpassvalid] = useState(true);
    const [uservalid , setuservalid] = useState(true);
    const [IsLogin , setLogin] = useState(true);
    const [isloading , setisloading] = useState(false);
    const [error , seterror] = useState();
    const[showmodal , setshowmodal ] = useState(false);
    const history = useHistory();
    const closeMapHandler = () =>{
        setshowmodal(false);
    }

    const OpenMapHandler = () =>{ 
        setshowmodal(true);
    }
    const Authentication = useContext(Authcontext);

    const imagefilehandler = useCallback((value) => {
        ChangeNewvalue((prev)=>{

            return{
                image : value,
                username : prev.username,
                email : prev.email,
                password : prev.password
            }
        }
        );
    },[])
    
    const InputHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        ChangeNewvalue((prev) =>{
            // if(name === "image"){
                
            //     return{
            //         image : value,
            //         username : prev.username,
            //         email : prev.email,
            //         password : prev.password
            //     }
               
            // }
            
            if(name === "username")
             {return{
                image : prev.image,
                username : value,
                email : prev.email,
                password : prev.password
                
             }}
             if(name === "email")
             {return{
                image : prev.image,
                username : prev.username,
                email : value,
                password : prev.password
             }}
             if(name === "password")
             {return{
                image : prev.image,
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
        ChangeNewvalue( {username: "" ,email:"" , password:"" ,image : undefined});
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
        console.log(Newvalue.password);
    
        if(IsLogin){
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
            if(!response.ok){
                seterror("cannot find");
                throw new Error(responsedata.message);
            }
            setisloading(false); 
            Authentication.login(responsedata.user.id);
            history.push('/');
        }
        catch(err){
            console.log(err);
            setisloading(false);
            seterror(err.message || "Invalid Credentials"); 
            OpenMapHandler();
            setIsvalid(false);
        }

        }
        if(!IsLogin){
            setisloading(true);
           
            try {
                const formdata = new FormData();
                formdata.append('name',Newvalue.username);
                formdata.append('email',Newvalue.email);
                formdata.append('password',Newvalue.password);
                formdata.append('image',Newvalue.image);
                console.log(formdata.entries);
            const response = await fetch("http://localhost:5000/users/signup",{
                method : 'POST',
                body : formdata
            });     

            const responsedata = await response.json();
            if(!response.ok){
                console.log("not ok");
                console.log(response.status);
                seterror("cannot find");
                throw new Error(responsedata.message);
            }
            console.log(responsedata);
            setisloading(false); 
            Authentication.login(responsedata.user.id);
            history.push("/");
        }
        catch(err){
            console.log(err);
            setisloading(false);
            seterror("fill the complete data");  
            OpenMapHandler(); 
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
        {showmodal && <Backdrop onClick={closeMapHandler}/>}
            <Errormodel show={showmodal} error={error} onClick={closeMapHandler}/> 
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
            
                {!IsLogin && <Imageupload id="image" name ="image" circle="50%" oninput = {imagefilehandler}/> }
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