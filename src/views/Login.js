import React from "react";
import {Button, Card, Row, TextInput} from "react-materialize";
import "../static/styles/login.css";
import {app} from '../utils/appConfig';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            email: {},
            password: {}
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleApiResponse(response) {
        console.log(response);
        if (response.hasErrors()) {
            this.setState({errorMessage: response.errors()[0]});
        } else {
            localStorage.setItem("token", response.token());
            this.props.history.push("/organizations");
        }
    }

    handleLogin(event) {
        event.preventDefault();
        app.apiClient().loginUser({email: this.state.email, password: this.state.password}, this.handleApiResponse);
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
                <Card title="Login">
                    <form onSubmit={this.handleLogin}>
                        <Row>
                            <TextInput s={12} type="email" label="Email" onChange={this.handleInputChange('email')}
                                       validate required/>
                        </Row>
                        <Row>
                            <TextInput s={12} type="password" label="Password"
                                       onChange={this.handleInputChange('password')} validate required/>
                        </Row>
                        <Row className="center-align">
                            <Button m={6} s={12} className="button" type="submit" small>
                                Login
                            </Button>
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