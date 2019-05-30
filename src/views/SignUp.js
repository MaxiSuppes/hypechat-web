import React from "react";
import {Button, Card, Row, TextInput} from "react-materialize";
import "../static/styles/login.css";
import {app} from '../utils/appConfig';
import {toast} from 'react-toastify';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            username: {},
            email: {},
            password: {}
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasError()) {
            this.setState({errorMessage: response.error()});
        } else {
            toast("Bienvenido", {type: toast.TYPE.SUCCESS});
            sessionStorage.setItem("userName", response.user()['username']);
            this.props.history.push("/teams");
        }
    }

    handleSignUp(event) {
        event.preventDefault();
        app.apiClient().signUpUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password},
            this.handleApiResponse);
    }

    handleInputChange(inputName) {
        return (event) => {
            const value = event.target.value;
            this.setState({[inputName]: value});
        }
    }

    content() {
        return (
            <div className="login-container">
                <Card title="Registro">
                    <form onSubmit={this.handleSignUp}>
                        <Row>
                            <TextInput s={12} label="Nombre de usuario" onChange={this.handleInputChange('username')}
                                       validate required/>
                        </Row>
                        <Row>
                            <TextInput s={12} type="email" label="Email" onChange={this.handleInputChange('email')}
                                       validate required/>
                        </Row>
                        <Row>
                            <TextInput s={12} type="password" label="Password"
                                       onChange={this.handleInputChange('password')} validate required/>
                        </Row>
                        <Row className="center-align">
                            <Button m={6} s={12} className="button" small>
                                Registrarse
                            </Button>
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