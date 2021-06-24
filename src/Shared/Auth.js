import React, {useState } from "react"
import "./Auth.css"

const Auth = () =>{

    const [Newvalue , ChangeNewvalue] = useState("");
    const InputHandler = (event) =>{
        ChangeNewvalue(event.target.value);
        }
    const onSubmitHandler = (event) =>{
        event.preventDefault();

    }    
    
    return(
        <div className="auth-container">
        <h1 className="authlogo">Share-Places</h1>
        <p>Join The Journey</p>
        <form onSubmit={onSubmitHandler}>

            <label className="mylabel" htmlFor="email">E-mail</label>
            <input 
                type="text" 
                className="authinput" 
                name="email"
                onChange = {InputHandler}
                value={Newvalue}
               placeholder="Enter Your Email">
            </input>
            <label className="mylabel" htmlFor="password">Password</label>
            <input  
                type="passowrd"
                className="authinput" 
                name="password"
                placeholder="Enter Password">
            </input>
          
            <button type="submit" className="authbutton">Log In</button>
            <p className="toggle">Don't have an account ? <a href="#s">Sign Up</a></p>
        </form>

        </div>
    );
}
export default Auth;