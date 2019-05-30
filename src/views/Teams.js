import React from "react";
import {Button, Collection, CollectionItem, Icon, Preloader, Row} from "react-materialize";
import noImage from '../static/images/no-image.png';
import {app} from "../utils/appConfig";

export class Teams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            teams: {}
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasError()) {
            this.setState({teams: []});
        } else {
            this.setState({teams: response.teams(), loading: false});
        }
    }

    componentDidMount() {
        app.apiClient().getTeams(this.handleApiResponse);
    }

    handleCreateTeam() {
        return this.props.history.push('new-team');
    }

    showTeams() {
        if (this.state.teams.length > 0) {
            return (
                <Collection>
                    {this.state.teams.map(team => {
                        return (
                            <CollectionItem className="avatar" href={`teams/${team['id']}`}>
                                <img src={noImage} alt="" className="circle"/>
                                <span className="title">
                                    {team['team_name']}
                                </span>
                                <p>
                                    {team['description']}
                                </p>
                                <p>
                                    Rol: {team['role']}
                                </p>
                            </CollectionItem>
                        )
                    })}
                </Collection>
            )
        }
    }

    noTeamsMessage() {
        if (this.state.teams.length === 0) {
            return (
                <div>
                    <Icon large>
                        info
                    </Icon>
                    <p>Aún no creaste ni sos adminisitrador de ningún equipo.</p>
                </div>
            )
        }
    }

    content() {
        return (
            <Row style={{maxWidth: "700px"}}>
                <Row>
                    {this.showTeams()}
                    {this.noTeamsMessage()}
                </Row>
                <Row className="center-align">
                    <Button m={12} s={12} className="button" onClick={this.handleCreateTeam} large>
                        Crear un equipo
                    </Button>
                </Row>
            </Row>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="center-align">
                    <Preloader size="big" />
                </div>
            )
        } else {
            return this.content();
        }
    }
}