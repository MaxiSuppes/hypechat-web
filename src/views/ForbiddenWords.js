import React from 'react';
import {Card, Icon, Row, Col, Button, TextInput, Preloader, Modal} from "react-materialize";
import Layout from "components/layout/Layout";
import {app} from 'app/app';
import {toast} from "react-toastify";
import 'static/styles/words.css';

export class ForbiddenWords extends React.Component {
    constructor(props) {
        super(props);

        this._modals = [];

        this.state = {
            loading: true,
            reloading: false,
            adding: false,
            deleting: false,
            teamId: props.match.params.teamId,
            forbiddenWords: [],
            newWord: '',
            errorMessage: undefined
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddWordResponse = this.handleAddWordResponse.bind(this);
        this.addWord = this.addWord.bind(this);
        this.handleDeleteWordApiResponse = this.handleDeleteWordApiResponse.bind(this);
        this.deleteWord = this.deleteWord.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        if (response.hasError()) {
            this.setState({forbiddenWords: []});
        } else {
            this.setState({forbiddenWords: response.words(), loading: false, reloading: false});
        }
    }

    getInitialData() {
        this.setState({reloading: true});
        app.apiClient().getForbiddenWords(this.state.teamId, this.handleInitialDataResponse);
    }

    componentDidMount() {
        this.getInitialData();
    }

    handleInputChange(event) {
        this.setState({newWord: event.target.value});
    }

    handleAddWordResponse(response) {
        if (response.hasError()) {
            toast("No se pudo agregar la palabra", {type: toast.TYPE.ERROR});
        } else {
            toast("Palabra agregada", {type: toast.TYPE.SUCCESS});
            this.getInitialData();
        }
        this.setState({adding: false});
    }

    addWord(event) {
        event.preventDefault();
        this.setState({adding: true});
        if (this.state.newWord.includes(' ')) {
            this.setState({errorMessage: 'La palabra no debe contener espacios'});
        } else {
            app.apiClient().addForbiddenWord(this.state.teamId, this.state.newWord, this.handleAddWordResponse);
        }
    }

    handleDeleteWordApiResponse(response, wordId) {
        if (response.hasError()) {
            toast("No se pudo eliminar la palabra", {type: toast.TYPE.ERROR});
        } else {
            this.setState({deleting: false});
            this._modals[wordId].hideModal();
            toast("Palabra prohibida eliminada", {type: toast.TYPE.SUCCESS});
            this.getInitialData();
        }
    }

    deleteWord(wordId) {
        this.setState({deleting: true});
        app.apiClient().deleteForbiddenWord(
            this.state.teamId, wordId,
            (response) => this.handleDeleteWordApiResponse(response, wordId)
        );
    }

    renderDeleteButton(word) {
        if (this.state.deleting) {
            return <Preloader size="small"/>;
        } else {
            return (
                <Button className="button" onClick={() => this.deleteWord(word.id)} small>
                    Confirmar
                </Button>
            );
        }
    }

    renderDeleteWordModal(word) {
        return (
            <Modal
                key={word.id}
                ref={(ref) => this._modals[word.id] = ref}
                header="Quitar la palabra del listado"
                trigger={
                    <a className="word-icon">
                        <Icon tiny>
                            close
                        </Icon>
                    </a>
                }
                actions={[
                    <Button className="button" modal="close" style={{"marginRight": "10px"}} small> Cancelar </Button>,
                    this.renderDeleteButton(word)]}>
                <p>
                    Esto quitará la palabra prohibida <b>{word.word}</b>.
                </p>
            </Modal>

        )
    }

    renderWordList() {
        if (this.state.reloading) {
            return <Preloader size="small"/>;
        } else {
            return this.state.forbiddenWords.map(word => {
                return (
                    <div className="word-container">
                        {word.word}
                        {this.renderDeleteWordModal(word)}
                    </div>
                );
            })
        }
    }

    renderAddButton() {
        if (this.state.saving) {
            return <Preloader size="small"/>;
        } else {
            return (
                <Button className="button" type="submit" small>
                    Agregar
                </Button>
            )
        }
    }

    content() {
        return (
            <div className="forbidden-word-container">
                <Card title="Palabras prohibidas">
                    <div className="forbidden-words-box">
                        {this.renderWordList()}
                    </div>
                    <Row>
                        <form onSubmit={this.addWord}>
                            <Col s={8}>
                                <TextInput s={12} label="Palabra" onChange={this.handleInputChange}
                                           error={this.state.errorMessage}
                                           validate required/>
                            </Col>
                            <Col s={4} className="invite-button">
                                {this.renderAddButton()}
                            </Col>
                        </form>
                    </Row>
                </Card>
            </div>
        )
    }

    render() {
        return <Layout teamId={this.state.teamId} content={this.content} loading={this.state.loading}/>;
    }
}