import React from "react";
import {useLocation} from "react-router-dom";

export const NoMatch = () => {
    let location = useLocation();
    return <div>
        <h3 style={{textAlign:"center"}}>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>;
};

