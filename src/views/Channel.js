import React from "react";
import Layout from "../components/layout/Layout";
import {app} from '../app/app';
import {Button, Card, Checkbox, Preloader, Row, Textarea, TextInput, Col} from "react-materialize";
import {toast} from "react-toastify";

export class Channel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            saving: false,
            channel: undefined,
            teamId: props.match.params.teamId,
            channelId: props.match.params.channelId
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.handleChannelEditResponse = this.handleChannelEditResponse.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.channel = this.channel.bind(this);
        this.content = this.content.bind(this);
    }

    channel(channels) {
        return channels.filter(channel => channel['id'].toString() === this.state.channelId)[0];
    }

    handleInitialDataResponse(response) {
        if (response.hasError()) {
            toast("Hubo un error al obtener los datos del canal. Vuelva a intentarlo más tarde",
                {type: toast.TYPE.ERROR});
            this.props.history.push(/teams/ + this.state.teamId + /channels/);
        } else {
            this.setState({channel: this.channel(response.channels()), loading: false});
        }
    }

    componentDidMount() {
        app.apiClient().getChannels(this.state.teamId, this.handleInitialDataResponse);
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
            </div>
        )
    }

    render() {
        return <Layout teamId={this.state.teamId} content={this.content} loading={this.state.loading}/>;
    }
}