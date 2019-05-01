import React from "react";
import {Layout} from "../components/layout/Layout";
import {app} from '../utils/appConfig';

export class Home extends React.Component {
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
        app.apiClient().getOrganization(this.organizationId(), this.handleApiResponse);
    }

    organizationId() {
        return this.props.match.params['organizationId'];
    }

    content() {
        return (
            <div>
                <p>Nombre: {this.state.organization.name} </p>
                <p>Dirección: {this.state.organization.location} </p>
                <p>Creador: {this.state.organization.creator} </p>
            </div>
        )
    }

    render() {
        return <Layout organizationId={this.organizationId()} content={this.content()} loading={this.state.loading}/>;
    }
}