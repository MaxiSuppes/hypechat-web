import React from "react";
import {Route, Redirect} from "react-router-dom";

// export const withLogin = (ProtectedView) => {
//     return class extends React.Component {
//         constructor(props) {
//             super(props);
//
//             this.state = {
//                 isAuthenticated: false;
//             }
//         }
//         componentDidMount() {
//             if ()
//         }
//
//         render() {
//             return <ProtectedView {...this.props}/>
//         }
//     }
// };

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("token") === null ?
            <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
    )} />
);