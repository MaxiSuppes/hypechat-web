import React from "react";
import {Button, Card, Row, TextInput, Preloader} from "react-materialize";
import "../static/styles/login.css";
import {app} from 'app/app';
import {toast} from "react-toastify";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            email: {},
            password: {},
            errorMessage: ''
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleApiResponse(response) {
        this.setState({loading: false});
        if (response.hasError()) {
            this.setState({errorMessage: "Usuario o contraseña incorrectos"});
        } else {
            toast("Holaa!", {type: toast.TYPE.SUCCESS});
            sessionStorage.setItem("userName", response.user()['username']);
            this.props.history.push("/teams");
        }
    }

    handleLogin(event) {
        this.setState({loading: true, errorMessage: ''});
        event.preventDefault();
        app.apiClient().loginUser({email: this.state.email, password: this.state.password}, this.handleApiResponse);
    }

    handleInputChange(inputName) {
        return (event) => {
            const value = event.target.value;
            this.setState({[inputName]: value});
        }
    }

    showLoginButton() {
        if (this.state.loading) {
            return (
                <Row className="center-align">
                    <Preloader size="big" />
                </Row>
            )
        } else {
            return (
                <Row className="center-align">
                    <Button m={6} s={12} className="button" type="submit" small>
                        Login
                    </Button>
                    <Button m={6} s={12} className="button" onClick={() => this.props.history.push("/signup")}
                            small>
                        Registrarse
                    </Button>
                </Row>
            )
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
                            <p style={{'color': 'red'}}>
                                {this.state.errorMessage}
                            </p>
                        </Row>
                        {this.showLoginButton()}
                    </form>
                </Card>
            </div>
        )
    }

    render() {
        return this.content();
    }
}