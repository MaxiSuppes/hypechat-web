import React from "react";
import {Button, Card, Row, TextInput, Textarea, Preloader} from "react-materialize";
import {app} from 'utils/appConfig';

export class NewTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            newTeamData: {
                name: '',
                location: '',
                description: '',
                welcomeMessage: ''
            }
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
    }

    handleApiResponse(response) {
        this.setState({loading: false});
        if (response.hasError()) {
            this.setState({errorMessage: response.error()});
        } else {
            this.props.history.push("/teams");
        }
    }

    handleCreateTeam(event) {
        this.setState({loading: true});
        event.preventDefault();
        app.apiClient().createTeam(this.state.newTeamData, this.handleApiResponse);
    }

    handleInputChange(inputName) {
        let newTeamData = this.state.newTeamData;
        return (event) => {
            newTeamData[inputName] = event.target.value;
            this.setState({newTeamData: newTeamData});
        }
    }

    showCreateTeamButton() {
        if (this.state.loading) {
            return <Preloader size="big" />
        } else {
            return (
                <Button m={6} s={12} className="button" type="submit" large>
                    Crear
                </Button>
            )
        }
    }

    content() {
        return (
            <div className="login-container">
                <Card title="Nuevo equipo">
                    <form onSubmit={this.handleCreateTeam}>
                        <Row>
                            <TextInput s={12} m={6} type="text" label="Nombre"
                                       onChange={this.handleInputChange('name')} validate required/>
                            <TextInput s={12} m={6} type="text" label="País"
                                       onChange={this.handleInputChange('location')} validate/>
                        </Row>
                        <Row>
                            <Textarea s={12} label="Descripción"
                                      onChange={this.handleInputChange('description')} validate />
                        </Row>
                        <Row>
                            <Textarea s={12} label="Mensaje de bienvenida"
                                      onChange={this.handleInputChange('welcomeMessage')} validate/>
                        </Row>
                        <Row className="center-align">
                            {this.showCreateTeamButton()}
                        </Row>
                    </form>
                </Card>
            </div>
        )
    }

    render() {
        return this.content();
    }
}