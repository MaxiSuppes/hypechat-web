import React from "react";
import Layout from "../components/layout/Layout";
import {app} from '../app/app';
import {Card, Row, Textarea, TextInput} from "react-materialize";

export class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            plotting: false,
            teams: [],
            users: [],
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        if (response.hasError()) {
            this.setState({teams: []});
        } else {
            this.setState({teams: response.teams()}, () => {
                this.setState({actualTeam: this.team(), loading: false});
            });
        }
    }

    componentDidMount() {
        app.apiClient().getTeams(this.handleInitialDataResponse);
    }

    content() {
        return (
            <div className="login-container">
                <Card title="Editar equipo">
                    <form onSubmit={this.handleEdit}>
                        <Row>
                            <TextInput s={12} m={6} label="Nombre"
                                       defaultValue={this.state.actualTeam['team_name'].toString()}
                                       onChange={this.handleInputChange('name')}
                                       validate required/>
                            <TextInput s={12} m={6} type="text" label="País"
                                       defaultValue={this.state.actualTeam['location']}
                                       onChange={this.handleInputChange('location')}
                                       validate/>
                        </Row>
                        <Row>
                            <Textarea s={12} label="Descripción"
                                      defaultValue={this.state.actualTeam['description']}
                                      onChange={this.handleInputChange('description')}
                                      validate/>
                        </Row>
                        <Row>
                            <Textarea s={12} label="Mensaje de bienvenida"
                                      defaultValue={this.state.actualTeam['welcome_message']}
                                      onChange={this.handleInputChange('welcomeMessage')}
                                      validate/>
                        </Row>
                        <Row className="center-align">
                            {this.showSaveButton()}
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