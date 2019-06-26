import React from 'react';
import {Button, Card, Collection, CollectionItem, Icon, Preloader, Row, TextInput} from "react-materialize";
import {toast} from 'react-toastify';
import Layout from "components/layout/Layout";
import {app} from 'app/app';
import "static/styles/bots.css";

export class Bots extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            saving: false,
            teamId: props.match.params.teamId,
            bots: [],
            newBotData: {
                name: '',
                url: ''
            }
        };

        this.handleGetBotsResponse = this.handleGetBotsResponse.bind(this);
        this.getBots = this.getBots.bind(this);
        this.handleCreateBotApiResponse = this.handleCreateBotApiResponse.bind(this);
        this.handleCreateBot = this.handleCreateBot.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.content = this.content.bind(this);
    }

    handleGetBotsResponse(response) {
        if (response.hasError()) {
            this.setState({bots: []});
        } else {
            this.setState({bots: response.bots(), loading: false});
        }
    }

    getBots() {
        this.setState({loading: true});
        app.apiClient().getBots(this.state.teamId, this.handleGetBotsResponse);
    }

    componentDidMount() {
        this.getBots();
    }

    handleCreateBotApiResponse(response) {
        console.log("response", response);
        this.setState({saving: false});
        if (response.hasError()) {
            toast("No se pudo crear el bot. Vuelva a intentarlo más tarde", {type: toast.TYPE.ERROR});
        } else {
            toast("El bot se creó correctamente", {type: toast.TYPE.SUCCESS});
            this.getBots();
        }
    }

    handleCreateBot(event) {
        event.preventDefault();
        this.setState({saving: true});
        app.apiClient().createBot(this.state.teamId, this.state.newBotData, this.handleCreateBotApiResponse)
    }

    handleInputChange(event) {
        let newBotData = this.state.newBotData;
        const inputName = event.target.name;
        newBotData[inputName] = event.target.value;

        this.setState({newBotData: newBotData});
    }

    renderBots() {
        return (
            <Collection header="Bots creados">
                {this.state.bots.map(bot => {
                    return (
                        <CollectionItem key={bot.id}>
                            <b>{bot.name}:</b> {bot.url || "https://www.google.com"}
                        </CollectionItem>
                    )
                })}
            </Collection>
        )
    }

    renderNoBotsMessage() {
        if (this.state.bots.length === 0) {
            return (
                <div className="center-align">
                    <Icon large>
                        info
                    </Icon>
                    <p>Aún no hay bots creados en el equipo.</p>
                </div>
            )
        }
    }

    renderCreateBotButton() {
        if (this.state.saving) {
            return <Preloader size="small"/>;
        } else {
            return (
                <Button className="button" type="submit" big>
                    Crear bot
                </Button>
            )
        }
    }

    content() {
        return (
            <div className="bots-container">
                <Row>
                    {this.renderBots()}
                    {this.renderNoBotsMessage()}
                </Row>
                <Card title="Nuevo bot">
                    <form onSubmit={this.handleCreateBot}>
                        <Row>
                            <TextInput s={12} label="Nombre" name="name" onChange={this.handleInputChange} validate required/>
                        </Row>
                        <Row>
                            <TextInput s={12} label="Url" name="url" onChange={this.handleInputChange} validate required/>
                        </Row>
                        <Row className="center-align">
                            {this.renderCreateBotButton()}
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