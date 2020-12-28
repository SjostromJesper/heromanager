import io from "socket.io-client";
import socket from "../../Network.js";
export const Login = () => {

    socket.on("googleLoginResponse")

    function facebookLogin(){


    }
    function twitterLogin(){

    }
    function googleLogin(){
        console.log("emit google login request");
        socket.emit("googleLogin", "");
    }
    function appleLogin(){

    }



    return (
        <div className="Login">
            <button id="facebook" onClick={facebookLogin}>Facebook</button>
            <button id="twitter" onClick={twitterLogin}>Twitter</button>
            <button id="google" onClick={googleLogin}>Google</button>
            <button id="apple" onClick={appleLogin}>Apple</button>
        </div>
    );
}