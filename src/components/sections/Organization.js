import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import "static/styles/layout/layout.css";
import {app} from 'utils/appConfig';

export class Organization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            organization: {}
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({organization: {}});
        } else {
            this.setState({organization: response.organization(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getOrganization(this.props.organizationId, this.handleApiResponse);
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading-content">
                    <CircularProgress variant='indeterminate' color={"#283f52"}/>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Nombre: {this.state.organization.name} </p>
                    <p>Dirección: {this.state.organization.location} </p>
                    <p>Creador: {this.state.organization.creator} </p>
                </div>
            )
        }
    }
}