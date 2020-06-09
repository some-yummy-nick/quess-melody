import React from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus} from "../../constants"

export const PrivateRoute = ({component: Component, authorizationStatus, ...rest}) =>
    <Route
        {...rest}
        exact
        render={props => (
            localStorage.getItem("authorizationStatus") === AuthorizationStatus.AUTH
                ? <Component {...props} />
                : <Redirect to="/login"/>
        )}
    />;
