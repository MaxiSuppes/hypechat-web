import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "../views/Login";
import {Teams} from "../views/Teams";
import {Team} from "../views/Team";
import {Users} from "../views/Users";
import {SignUp} from "../views/SignUp";
import {NewTeam} from "../views/NewTeam";
import {User} from "../views/User";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <PrivateRoute exact path="/teams" component={Teams}/>
                    <PrivateRoute exact path="/new-team" component={NewTeam}/>
                    <PrivateRoute exact path="/teams/:teamId" component={Team}/>
                    <PrivateRoute exact path="/teams/:teamId/users" component={Users}/>
                    <PrivateRoute exact path="/teams/:teamId/users/:userId" component={User}/>
                </div>
            </Router>
        );
    }
}

export default Routes;