import React from "react";
import Layout from "../components/layout/Layout";
import {app} from '../app/app';
import {Button, Card, Checkbox, Preloader, Row, Textarea, TextInput, Col, Table, Modal, Icon, Tabs, Tab} from "react-materialize";
import {toast} from "react-toastify";

export class Channel extends React.Component {
    constructor(props) {
        super(props);

        this._modal = React.createRef();

        this.state = {
            loading: true,
            saving: false,
            channel: undefined,
            users: [],
            teamId: props.match.params.teamId,
            channelId: props.match.params.channelId
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.handleChannelEditResponse = this.handleChannelEditResponse.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteUserFromChannel = this.handleDeleteUserFromChannel.bind(this);
        this.channel = this.channel.bind(this);
        this.content = this.content.bind(this);
    }

    channel(channels) {
        return channels.filter(channel => channel['id'].toString() === this.state.channelId)[0];
    }

    handleInitialDataResponse(response) {
        console.log("response", response);
        const channelsResponse = response['channels'];
        const usersResponse = response['users'];
        if (channelsResponse.hasError() || usersResponse.hasError()) {
            toast("Hubo un error al obtener los datos del canal. Vuelva a intentarlo más tarde",
                {type: toast.TYPE.ERROR});
            this.props.history.push(/teams/ + this.state.teamId + /channels/);
        } else {
            this.setState({
                channel: this.channel(channelsResponse.channels()),
                users: usersResponse.users(),
                loading: false
            });
        }
    }

    componentDidMount() {
        app.apiClient().getChannelInitialData(this.state.teamId, this.state.channelId, this.handleInitialDataResponse);
    }

    handleChannelEditResponse(response) {
        if (response.hasError()) {
            toast("Hubo un error al guardar. Vuelva a intentarlo más tarde", {type: toast.TYPE.ERROR});
        } else {
            toast("Guardado", {type: toast.TYPE.SUCCESS});
        }
        this.setState({saving: false});
    }

    handleEdit(event) {
        this.setState({saving: true});
        event.preventDefault();
        app.apiClient().editChannel(
            this.state.teamId,
            this.state.channelId,
            this.state.channel, this.handleChannelEditResponse);
    }

    handleVisibilityChange(event) {
        let channel = this.state.channel;
        if (event.target.checked) {
            channel['visibility'] = 'PRIVATE';
        } else {
            channel['visibility'] = 'PUBLIC';
        }

        this.setState({channel: channel});
    }

    handleInputChange(inputName) {
        let channel = this.state.channel;
        return (event) => {
            channel[inputName] = event.target.value;
            this.setState({channel: channel});
        }
    }

    handleDeleteUserFromChannel(userId) {
        this._modal.current.hideModal();
        console.log("user", userId);
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

    renderDeleteButton(user) {
        if (this.state.deleting) {
            return <Preloader size="small"/>;
        } else {
            return (
                <Button className="button" onClick={() => this.handleDeleteUserFromChannel(user.id)} small>
                    Confirmar
                </Button>
            );
        }
    }

    renderDeleteChannelModal(user) {
        return (
            <Modal
                ref={this._modal}
                header="Quitar usuario del canal"
                trigger={
                    <a href="javascript:void(0)" className="left-align">
                        <Icon>
                            delete
                        </Icon>
                    </a>}
                actions={[
                    <Button className="button" modal="close" style={{"marginRight": "10px"}} small> Cancelar </Button>,
                    this.renderDeleteButton(user)]}>
                <p>
                    Esto quitará al usuario <b>{user['username']}</b> del canal.
                </p>
            </Modal>

        )
    }

    content() {
        return (
            <div className="login-container">
                <Tabs className="tab-demo z-depth-1">
                    <Tab title="Info" active>
                        <Card title="Editar canal">
                            <form onSubmit={this.handleEdit}>
                                <Row>
                                    <TextInput s={12} m={6} label="Nombre"
                                               defaultValue={this.state.channel['name'].toString()}
                                               onChange={this.handleInputChange('name')}
                                               validate required/>
                                    <Col s={12} m={6} style={{"margin-top": "40px"}} >
                                        <Checkbox value="PRIVATE" label="Privado"
                                                  checked={this.state.channel['visibility'] === 'PRIVATE'}
                                                  onChange={this.handleVisibilityChange}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Textarea s={12} label="Descripción"
                                              defaultValue={this.state.channel['description']}
                                              onChange={this.handleInputChange('description')}
                                              validate/>
                                </Row>
                                <Row>
                                    <Textarea s={12} label="Mensaje de bienvenida"
                                              defaultValue={this.state.channel['welcome_message']}
                                              onChange={this.handleInputChange('welcomeMessage')}
                                              validate/>
                                </Row>
                                <Row className="center-align">
                                    {this.showSaveButton()}
                                </Row>
                            </form>
                        </Card>
                    </Tab>
                    <Tab title="Usuarios">
                        <Card title="Usuarios">
                            <Table>
                                <thead>
                                <tr>
                                    <th data-field="id">
                                        Nombre
                                    </th>
                                    <th data-field="name">
                                        Nombre de usuario
                                    </th>
                                    <th data-field="price">
                                        Acciones
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map(user => {
                                    return (
                                        <tr>
                                            <td>
                                                {user['first_name'] || '---'}
                                            </td>
                                            <td>
                                                {user['username']}
                                            </td>
                                            <td>
                                                {this.renderDeleteChannelModal(user)}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        )
    }

    render() {
        return <Layout teamId={this.state.teamId} content={this.content} loading={this.state.loading}/>;
    }
}