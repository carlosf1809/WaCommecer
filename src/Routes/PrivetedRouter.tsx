import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
    path: string,
    component: React.ComponentType;
}

const PrivatedRoute: React.FC<RouteProps> = ({
    path,
    component: Component,
    ...rest
  }) => {


    return(
        !!localStorage.getItem('@tokenWa') ? 
            <ReactDOMRoute
            {...rest}
            render={({ location }) => { 
              return (
                <Component/>
              )
               
            }}/>
        : 
        <ReactDOMRoute
            {...rest}
            render={({ location }) => { 
              return (
                <div>Sem tokem!!!!!!!</div>
              )
               
            }}/>
    )
}

export default PrivatedRoute;
