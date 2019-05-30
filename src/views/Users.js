import React from 'react';
import {Layout} from "../components/layout/Layout";
import {CollectionItem, Row, Col, Collection, Icon, TextInput, Preloader, Button} from "react-materialize";
import {app} from '../utils/appConfig';
import "../static/styles/users.css";
import defaultUserImage from '../static/images/default-user.png';
import {toast} from 'react-toastify';

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            sending: false,
            teamId: props.match.params.teamId,
            users: [],
            emailToSend: undefined
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInviteUserApiResponse = this.handleInviteUserApiResponse.bind(this);
        this.handleInviteUser = this.handleInviteUser.bind(this);
        this.content = this.content.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasError()) {
            this.setState({users: []});
        } else {
            this.setState({users: response.users(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getUsers(this.state.teamId, this.handleApiResponse);
    }

    handleInviteUserApiResponse(response) {
        if (response.hasError()) {
            toast("No se pudo enviar la invitación", {type: toast.TYPE.ERROR});
        } else {
            toast("Invitación enviada", {type: toast.TYPE.SUCCESS});
            this.setState({sending: false});
        }
    }

    handleInviteUser(event) {
        event.preventDefault();
        this.setState({sending: true});
        app.apiClient().inviteUser(this.state.teamId, this.state.emailToSend, this.handleInviteUserApiResponse);
    }

    showInviteButton() {
        if (this.state.sending) {
            return <Preloader size="small"/>;
        } else {
            return (
                <Button className="button" type="submit" small>
                    Invitar
                </Button>
            )
        }
    }

    content() {
        return (
            <div className="invite-container">
                <Row>
                    <Collection>
                        {this.state.users.map(user => {
                            return (
                                <CollectionItem key={user.id} className="avatar">
                                    <img src={defaultUserImage} alt="" className="circle"/>
                                    <span className="title">
                                        {user.username}
                                    </span>
                                    <p>
                                        Rol: {user.role}
                                    </p>
                                    <a href="javascript:void(0)" className="secondary-content">
                                        <Icon>
                                            delete
                                        </Icon>
                                    </a>
                                </CollectionItem>
                            )
                        })}
                    </Collection>
                </Row>
                <Row className="invite-form">
                    <form onSubmit={this.handleInviteUser}>
                        <Col s={8}>
                            <TextInput type="email" label="Email"
                                       onChange={(event) => this.setState({emailToSend: event.target.value})}
                                       validate required/>
                        </Col>
                        <Col s={4} className="invite-button">
                            {this.showInviteButton()}
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