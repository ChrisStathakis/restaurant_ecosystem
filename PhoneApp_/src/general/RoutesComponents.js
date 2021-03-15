import React from 'react';
import { Route } from 'react-router';


function PrivateRoute({component, ...rest}){
    return(
        <Route
            {...rest}
            render={props}
    )
}