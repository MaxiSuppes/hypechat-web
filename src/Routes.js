import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "./views/Login";
import {Teams} from "./views/Teams";
import {Team} from "./views/Team";
import {Channels} from "./views/Channels";
import {Users} from "./views/Users";
import {ForbiddenWords} from "./views/ForbiddenWords";
import {SignUp} from "./views/SignUp";
import {NewTeam} from "./views/NewTeam";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/teams" component={Teams}/>
                    <Route exact path="/new-team" component={NewTeam}/>
                    <Route exact path="/teams/:teamId" component={Team}/>
                    <Route exact path="/:organizationId/channels" component={Channels}/>
                    <Route exact path="/:organizationId/words" component={ForbiddenWords}/>
                    <Route exact path="/:organizationId/users" component={Users}/>
                </div>
            </Router>
        );
    }
}

export default Routes;