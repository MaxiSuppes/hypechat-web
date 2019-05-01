import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home} from "./views/Home";
import {Channels} from "./views/Channels";
import {Users} from "./views/Users";
import {ForbiddenWords} from "./views/ForbiddenWords";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/:organizationId" component={Home}/>
                    <Route exact path="/:organizationId/channels" component={Channels}/>
                    <Route exact path="/:organizationId/words" component={ForbiddenWords}/>
                    <Route exact path="/:organizationId/users" component={Users}/>
                </div>
            </Router>
        );
    }
}

export default Routes;