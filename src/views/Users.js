import React from 'react';
import {Button, Col, Collection, CollectionItem, Icon, Preloader, Row, Select} from "react-materialize";
import {toast} from 'react-toastify';
import {app} from 'app/app';
import Layout from "components/layout/Layout";
import defaultUserImage from 'static/images/default-user.png';
import "static/styles/users.css";
import {ConfirmationModal} from "../components/ConfirmationModal";

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this._modals = {};

        this.state = {
            loading: true,
            saving: false,
            deleting: false,
            teamId: props.match.params.teamId,
            teamUsers: [],
            allUsers: [],
            userToAdd: undefined
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleDeleteUserApiResponse = this.handleDeleteUserApiResponse.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleAddUserResponse = this.handleAddUserResponse.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.content = this.content.bind(this);
    }

    handleApiResponse(response) {
        const teamUsersResponse = response['teamUsers'];
        const allUsersResponse = response['allUsers'];
        if (teamUsersResponse.hasError() || allUsersResponse.hasError()) {
        } else {
            this.setState({
                teamUsers: teamUsersResponse.users(),
                allUsers: allUsersResponse.users(),
                loading: false
            });
        }
    }

    getInitialData() {
        app.apiClient().getTeamUsersInitialData(this.state.teamId, this.handleApiResponse);
    }

    componentDidMount() {
        this.getInitialData();
    }

    handleDeleteUserApiResponse(response, userId) {
        this.setState({deleting: false});
        if (response.hasError()) {
            toast("No se pudo eliminar al usuario del equipo", {type: toast.TYPE.ERROR});
        } else {
            this._modals[userId].hideModal();
            toast("Usuario eliminado del equipo", {type: toast.TYPE.SUCCESS});
            this.getInitialData();
        }
    }

    handleDeleteUser(userId) {
        this.setState({deleting: true});
        app.apiClient().deleteUser(this.state.teamId, userId,
            (response) => this.handleDeleteUserApiResponse(response, userId)
        );
    }

    renderDeleteUserModal(user) {
        const text = <p> Esto quitará al usuario <b>{user.username}</b> del equipo.</p>;
        return (
            <ConfirmationModal ref={(ref) => this._modals[user.id] = ref}
                               header="Quitar usuario"
                               text={text}
                               handleConfirm={() => this.handleDeleteUser(user.id)}
                               loading={this.state.deleting}/>
        );
    }

    handleAddUserResponse(response) {
        this.setState({saving: false});

        if (response.hasError()) {
            toast("No se pudo agregar al usuario al equipo", {type: toast.TYPE.ERROR});
        } else {
            toast("Usuario agregado al equipo", {type: toast.TYPE.SUCCESS});
            this.getInitialData();
        }
    }

    handleAddUser(event) {
        event.preventDefault();
        if (this.state.userToAdd === 0) {
            this.setState({errorMessage: "Selecciona un usuario del listado"});
            return;
        }

        this.setState({saving: true});
        app.apiClient().addUserToTeam(this.state.teamId, this.state.userToAdd, this.handleAddUserResponse);
    }

    handleSelect(event) {
        event.preventDefault();
        this.setState({userToAdd: event.target.value});
    }

    renderInviteButton() {
        if (this.state.saving) {
            return (
                <div style={{"margin-top": "20px"}}>
                    <Preloader color="green" size="small"/>
                </div>
            );
        } else {
            return (
                <Button className="button" type="submit" small>
                    Agregar
                </Button>
            )
        }
    }

    renderUsers() {
        return (
            <Row>
                <Collection>
                    {this.state.teamUsers.map(user => {
                        const teamId = this.state.teamId;
                        return (
                            <CollectionItem key={user.id} className="avatar"
                                            href={/teams/ + teamId + /users/ + user.id}>
                                <img src={defaultUserImage} alt="" className="circle"/>
                                <span className="title">
                                        {user.username}
                                    </span>
                                <p>
                                    Rol: {user.role}
                                </p>
                                {this.renderDeleteUserModal(user)}
                            </CollectionItem>
                        )
                    })}
                </Collection>
            </Row>
        )
    }

    noUsersMessage() {
        if (this.state.teamUsers.length === 0) {
            return (
                <div className="center-align">
                    <Icon large>
                        info
                    </Icon>
                    <p>Aún no hay usuarios en el equipo.</p>
                </div>
            )
        }
    }

    content() {
        return (
            <div className="invite-container">
                {this.renderUsers()}
                {this.noUsersMessage()}
                <Row className="invite-user-form">
                    <form onSubmit={this.handleAddUser}>
                        <Col s={8}>
                            <Select value={this.state.userToAdd || "disabled"}
                                    onChange={this.handleSelect} label="Seleccionar usuario">
                                <option value="disabled" disabled>
                                    Nombre de usuario
                                </option>
                                {this.state.allUsers.map(user => {
                                    return (
                                        <option value={user.id}>
                                            {user.username || user['first_name'] + user['last_name']}
                                        </option>
                                    )
                                })}
                            </Select>
                        </Col>
                        <Col s={4}>
                            {this.renderInviteButton()}
                        </Col>
                    </form>
                </Row>
            </div>
        )
    }

    render() {
        return <Layout teamId={this.state.teamId} content={this.content} loading={this.state.loading}/>;
    }
}