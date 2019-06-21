import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "views/Login";
import {Teams} from "views/Teams";
import {Team} from "views/Team";
import {Users} from "views/Users";
import {SignUp} from "views/SignUp";
import {NewTeam} from "views/NewTeam";
import {User} from "views/User";
import {Channels} from "views/Channels";
import {Channel} from "views/Channel";
import {ForbiddenWords} from "views/ForbiddenWords";
import {Stats} from "views/Stats";
import {PrivateRoute} from "./PrivateRoute";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <PrivateRoute exact path="/home" component={Stats}/>
                    <PrivateRoute exact path="/teams" component={Teams}/>
                    <PrivateRoute exact path="/new-team" component={NewTeam}/>
                    <PrivateRoute exact path="/teams/:teamId" component={Team}/>
                    <PrivateRoute exact path="/teams/:teamId/users" component={Users}/>
                    <PrivateRoute exact path="/teams/:teamId/forbidden-words" component={ForbiddenWords}/>
                    <PrivateRoute exact path="/teams/:teamId/users/:userId" component={User}/>
                    <PrivateRoute exact path="/teams/:teamId/channels" component={Channels}/>
                    <PrivateRoute exact path="/teams/:teamId/channels/:channelId" component={Channel}/>
                </div>
            </Router>
        );
    }
}

export default Routes;