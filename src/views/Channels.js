import React from 'react';
import Layout from "../components/layout/Layout";
import {Button, Checkbox, Col, Collection, CollectionItem, Icon, Preloader, Row, TextInput} from "react-materialize";
import {app} from '../app/app';
import "../static/styles/users.css";
import defaultUserImage from '../static/images/default-user.png';
import {toast} from 'react-toastify';
import {ConfirmationModal} from "../components/ConfirmationModal";

export class Channels extends React.Component {
    constructor(props) {
        super(props);

        this._modals = {};

        this.state = {
            loading: true,
            saving: false,
            deleting: false,
            teamId: props.match.params.teamId,
            channels: [],
            newChannelData: {
                name: '',
                visibility: 'PUBLIC'
            }
        };

        this.handleGetChannelsResponse = this.handleGetChannelsResponse.bind(this);
        this.getChannels = this.getChannels.bind(this);
        this.handleDeleteChannelApiResponse = this.handleDeleteChannelApiResponse.bind(this);
        this.handleDeleteChannel = this.handleDeleteChannel.bind(this);
        this.handleCreateChannelApiResponse = this.handleCreateChannelApiResponse.bind(this);
        this.handleCreateChannel = this.handleCreateChannel.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.content = this.content.bind(this);
    }

    componentDidMount() {
        this.getChannels();
    }

    handleGetChannelsResponse(response) {
        if (response.hasError()) {
            this.setState({channels: []});
        } else {
            this.setState({channels: response.channels(), loading: false});
        }
    }

    getChannels() {
        this.setState({loading: true});
        app.apiClient().getChannels(this.state.teamId, this.handleGetChannelsResponse);
    }

    handleDeleteChannelApiResponse(response, channelId) {
        this.setState({deleting: false});
        if (response.hasError()) {
            toast("No se pudo eliminar el canal del equipo", {type: toast.TYPE.ERROR});
        } else {
            this._modals[channelId].hideModal();
            toast("Canal eliminado del equipo", {type: toast.TYPE.SUCCESS});
            this.getChannels();
        }
    }

    handleDeleteChannel(channelId) {
        this.setState({deleting: true});
        app.apiClient().deleteChannel(this.state.teamId, channelId,
            (response) => this.handleDeleteChannelApiResponse(response, channelId));
    }

    handleCreateChannelApiResponse(response) {
        this.setState({saving: false});
        if (response.hasError()) {
            toast("No se pudo crear el canal. Vuelva a intentarlo más tarde", {type: toast.TYPE.ERROR});
        } else {
            toast("El canal se creó correctamente", {type: toast.TYPE.SUCCESS});
            this.getChannels();
        }
    }

    handleCreateChannel(event) {
        event.preventDefault();
        this.setState({saving: true});
        app.apiClient().createChannel(this.state.teamId, this.state.newChannelData, this.handleCreateChannelApiResponse)
    }

    handleVisibilityChange(event) {
        let newChannelData = this.state.newChannelData;
        if (event.target.checked) {
            newChannelData['visibility'] = 'PRIVATE';
        } else {
            newChannelData['visibility'] = 'PUBLIC';
        }

        this.setState({newChannelData: newChannelData});
    }

    handleNameChange(event) {
        let newChannelData = this.state.newChannelData;
        newChannelData['name'] = event.target.value;

        this.setState({newChannelData: newChannelData});
    }

    renderDeleteChannelModal(channel) {
        const text = <p>Esto eliminará el canal <b>{channel.name}</b> del equipo.</p>;
        return (
            <ConfirmationModal ref={(ref) => this._modals[channel.id] = ref}
                               header="Eliminar canal"
                               text={text}
                               handleConfirm={() => this.handleDeleteChannel(channel.id)}
                               loading={this.state.deleting}/>
        );
    }

    renderChannels() {
        return (
            <Collection>
                {this.state.channels.map(channel => {
                    const teamId = this.state.teamId;
                    return (
                        <CollectionItem key={channel.id} className="avatar" href={/teams/ + teamId + /channels/ + channel.id}>
                            <img src={defaultUserImage} alt="" className="circle"/>
                            <span className="title">
                                {channel.name}
                            </span>
                            <br/>
                            <span style={{"color": "gray"}}>
                                {channel.visibility === 'PRIVATE' ? 'privado' : 'público'}
                            </span>
                            {this.renderDeleteChannelModal(channel)}
                        </CollectionItem>
                    )
                })}
            </Collection>
        )
    }

    renderNoChannelsMessage() {
        if (this.state.channels.length === 0) {
            return (
                <div className="center-align">
                    <Icon large>
                        info
                    </Icon>
                    <p>Aún no hay canales creados en el equipo.</p>
                </div>
            )
        }
    }

    renderCreateChannelButton() {
        if (this.state.saving) {
            return <Preloader color="green" size="small"/>;
        } else {
            return (
                <Button className="button" type="submit" small>
                    Crear canal
                </Button>
            )
        }
    }

    content() {
        return (
            <div className="invite-container">
                <Row>
                    {this.renderChannels()}
                    {this.renderNoChannelsMessage()}
                </Row>
                <Row className="invite-form">
                    <form onSubmit={this.handleCreateChannel}>
                        <Col s={5}>
                            <TextInput label="Nombre" onChange={this.handleNameChange} validate required/>
                        </Col>
                        <Col s={3} style={{"padding-top": "40px"}}>
                            <Checkbox value="PRIVATE" label="Privado" onChange={this.handleVisibilityChange}/>
                        </Col>
                        <Col s={4} className="invite-button">
                            {this.renderCreateChannelButton()}
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