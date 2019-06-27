import React from "react";
import {Button, Card, Preloader, Row, TextInput} from "react-materialize";
import {app} from 'app/app';
import {toast} from 'react-toastify';
import "static/styles/login.css";

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            username: {},
            email: {},
            password: {},
            errorMessage: ''
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleApiResponse(response) {
        this.setState({loading: false});
        if (response.hasError()) {
            this.setState({errorMessage: response.error()});
        } else {
            toast("Bienvenido", {type: toast.TYPE.SUCCESS});
            sessionStorage.setItem("userName", response.user()['username']);
            this.props.history.push("/home");
        }
    }

    handleSignUp(event) {
        event.preventDefault();
        this.setState({loading: true});
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

    renderSignUpButton() {
        if (this.state.loading) {
            return (
                <Row className="center-align">
                    <Preloader size="big" />
                </Row>
            )
        } else {
            return (
                <Row className="center-align">
                    <Button m={6} s={12} className="button" small>
                        Registrarse
                    </Button>
                </Row>
            )
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
                            <p style={{'color': 'red'}}>
                                {this.state.errorMessage}
                            </p>
                        </Row>
                        {this.renderSignUpButton()}
                    </form>
                </Card>
            </div>
        )
    }

    render() {
        return this.content();
    }
}