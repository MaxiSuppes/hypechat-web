import React from "react";
import Layout from "../components/layout/Layout";
import {app} from '../app/app';
import {Button, Card, Preloader, Row, Textarea, TextInput} from "react-materialize";

export class Team extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            saving: false,
            teams: [],
            teamId: props.match.params.teamId,
            actualTeam: {}
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.handleTeamEditResponse = this.handleTeamEditResponse.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.content = this.content.bind(this);
        this.team = this.team.bind(this);
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

    handleTeamEditResponse(response) {
        if (response.hasError()) {
            console.log(response);
        }

        this.setState({saving: false});
    }

    handleEdit(event) {
        this.setState({saving: true});
        event.preventDefault();
        app.apiClient().editTeam(this.state.teamId, this.state.actualTeam, this.handleTeamEditResponse);
    }

    handleInputChange(inputName) {
        let actualTeam = this.state.actualTeam;
        return (event) => {
            actualTeam[inputName] = event.target.value;
            this.setState({actualTeam: actualTeam});
        }
    }

    team() {
        const team = this.state.teams.filter(team => team['id'].toString() === this.state.teamId)[0];
        return team;
    }

    showSaveButton() {
        if (this.state.saving) {
            return <Preloader size="big" />
        } else {
            return (
                <Button m={6} s={12} className="button" type="submit" large>
                    Guardar
                </Button>
            )
        }
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
                            <TextInput s={12} m={6} type="text" label="Ubicación"
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