import io from "socket.io-client";

class Network {
    constructor() {
        this.socket = io.connect("http://localhost:3001", {
            withCredentials: true,
            extraHeaders: {
                "auth": "tokenId"
            }
        });
    }

    on(name, callback){
        this.socket.on(name, callback);
    }

    emit(name, parameter){
        this.socket.emit(name, parameter);
    }

    isConnected(){
        if(this.socket){
            return true;
        }
        return false;
    }
}

export default Network;