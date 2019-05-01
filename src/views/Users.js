import React from 'react';
import {Layout} from "../components/layout/Layout";
import {app} from '../utils/appConfig';

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: []
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({users: []});
        } else {
            this.setState({users: response.users(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getUsers(this.organizationId(), this.handleApiResponse);
    }

    organizationId() {
        return this.props.match.params['organizationId'];
    }

    content() {
        return (
            <ul>
                {this.state.users.map(user => <li>{user.userName}</li>)}
            </ul>
        )
    }

    render() {
        return <Layout organizationId={this.organizationId()} content={this.content()} loading={this.state.loading}/>;
    }
}