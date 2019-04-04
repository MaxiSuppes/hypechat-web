import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home} from "./components/Home";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/:organizationId" component={Home}/>
                </div>
            </Router>
        );
    }
}

export default Routes;