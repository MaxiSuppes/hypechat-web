import React from "react";
import Layout from "../components/layout/Layout";
import {app} from '../app/app';
import {Card, Row, TextInput} from "react-materialize";

export class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {},
            teamId: props.match.params.teamId,
            userId: props.match.params.userId
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        if (response.hasError()) {
            this.setState({user: []});
        } else {
            this.setState({user: response.user(), loading: false});
        }
    }

    componentDidMount() {
        app.apiClient().getUser(this.state.teamId, this.state.userId, this.handleInitialDataResponse);
    }

    content() {
        return (
            <div className="login-container">
                <Card title="Datos del usuario">
                    <form>
                        <Row>
                            <TextInput s={12} m={6} label="Nombre de usuario" value={this.state.user['username']}/>
                            <TextInput s={12} m={6} type="email" label="Email" value={this.state.user['email']}/>
                        </Row>
                        <Row>
                            <TextInput s={12} m={6} label="Nombre" value={this.state.user['first_name']}/>
                            <TextInput s={12} m={6} label="Apellido" value={this.state.user['last_name']}/>
                        </Row>
                    </form>
                </Card>
            </div>
        )
    }

    render() {
        return <Layout teamId={this.state.teamId} content={this.content} loading={this.state.loading}/>;
    }
}