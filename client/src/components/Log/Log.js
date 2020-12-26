import {useContext} from "react";
import {logContext} from "../../contexts/LogContext.js";

export const Log = () => {
    let value = useContext(logContext)
    console.log(value.title)

    return (
        <div className="Log">
            <p>log</p>
        </div>
    );
}
