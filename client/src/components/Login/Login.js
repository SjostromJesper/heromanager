import {useEffect, useState, useContext} from "react";
import socket from "../../Network.js";

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    socket.on("googleLoginResponse")

    socket.on("loginSuccess", user => {
        document.getElementById("loginMessage").setAttribute("color", "green");
        document.getElementById("loginMessage").textContent = "Logged in!"
    });

    socket.on("loginFailure", err => {
        document.getElementById("loginMessage").setAttribute("color", "red");
        document.getElementById("loginMessage").textContent = "wrong password!"
    });

    function login(email, password){
        socket.emit("login", {email: email, password: password});
    }

    function emailChange(event){
        setEmail(event.target.value);
    }

    function passwordChange(event){
        setPassword(event.target.value);
    }

    function facebookLogin() {


    }

    function twitterLogin() {

    }

    function googleLogin() {
        console.log("emit google login request");
        socket.emit("googleLogin", "");
    }

    function appleLogin() {

    }


    return (

        <div className="Top">
            <div className="Login">
                <input onChange={emailChange} type="text" placeholder="email"></input>
                <input onChange={passwordChange} type="text" placeholder="password"></input>
                <button id="login" onClick={() => login(email, password)}>Login</button>
            </div>
            <label id="loginMessage"></label>
            <div className="Login">
                <button id="facebook" onClick={facebookLogin}>Facebook</button>
                <button id="twitter" onClick={twitterLogin}>Twitter</button>
                <button id="google" onClick={googleLogin}>Google</button>
                <button id="apple" onClick={appleLogin}>Apple</button>
            </div>
        </div>

    );
}