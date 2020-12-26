import {useContext, useEffect} from "react";
import {logContext} from "../../contexts/LogContext.js";

function LogText(props) {
    let value = useContext(logContext)
    console.log(value.logText)

    useEffect(() => {

    })

    return (
        <div className="LogText">
            <p>logtext</p>
        </div>
    );
}

export default LogText;
