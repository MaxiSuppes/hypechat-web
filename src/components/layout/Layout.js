import React from "react";
import {Row, Icon, Navbar, NavItem, Preloader, SideNav, SideNavItem} from "react-materialize";
import {withRouter} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {app} from "app/app";
import noImage from "static/images/no-image.png"
import defaultUserImage from "static/images/default-user.png"
import "static/styles/layout.css";

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogoutResponse = this.handleLogoutResponse.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    userName() {
        return sessionStorage.getItem("userName");
    }

    handleLogoutResponse(response) {
        if (response.hasError()) {
            toast("No se pudo desloguear. Vuelva a intentarlo más tarde", {type: toast.TYPE.ERROR});
        } else {
            sessionStorage.removeItem("X-Auth-Token");
            sessionStorage.removeItem("userName");
            this.props.history.push("/")
        }
    }

    handleLogOut() {
        app.apiClient().logOutUser(this.handleLogoutResponse);
    }

    renderContent() {
        if (this.props.loading) {
            return (
                <Row style={{"margin-top": "50px"}}>
                    <Preloader color="green" size="big"/>
                </Row>
            )
        } else {
            return this.props.content();
        }
    }

    renderTeamOptions() {
        if (this.props.teamId) {
            return [
                <SideNavItem href={/teams/ + this.props.teamId + /users/}>
                    Usuarios
                </SideNavItem>,
                <SideNavItem href={/teams/ + this.props.teamId + /channels/}>
                    Canales
                </SideNavItem>,
                <SideNavItem href={/teams/ + this.props.teamId + /forbidden-words/}>
                    Palabras prohibidas
                </SideNavItem>,
                <SideNavItem divider/>
            ]
        }
    }

    renderBackToTeam() {
        const teamId = this.props.teamId;
        if (teamId && this.props.history.location.pathname !== ('/teams/' + teamId)) {
            return(
                <a className="back-to-team" href={/teams/ + this.props.teamId}>
                    <Icon className="back-to-team-icon">
                        arrow_back_ios
                    </Icon>
                    <span>Volver al equipo</span>
                </a>
            )
        }
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Navbar className="nav-bar"
                        brand={
                            <a className="brand-logo" href={/home/}>
                                Hypechat
                            </a>
                        }
                        alignLinks="right">
                    <NavItem className="close-session" onClick={this.handleLogOut}>
                        <Icon className="close-session-icon" left>
                            input
                        </Icon>
                        Cerrar Sesión
                    </NavItem>
                    <NavItem>
                        <SideNav
                            className="side-nav"
                            trigger={
                                <NavItem>
                                    <Icon className="side-nav-menu">
                                        menu
                                    </Icon>
                                </NavItem>
                            }
                            options={{closeOnClick: true, edge: 'right'}}>
                            <SideNavItem userView
                                         user={{
                                             background: noImage,
                                             image: defaultUserImage,
                                             name: this.userName(),
                                         }}/>
                            {this.renderTeamOptions()}
                            <SideNavItem href='/home'>
                                Inicio
                            </SideNavItem>
                            <SideNavItem href='/teams'>
                                Todos los equipo
                            </SideNavItem>
                            <SideNavItem href='/new-team'>
                                Crear equipo
                            </SideNavItem>
                        </SideNav>
                    </NavItem>
                </Navbar>
                <main style={{"padding": "50px", "display": "flex"}}>
                    {this.renderBackToTeam()}
                    {this.renderContent()}
                </main>
            </div>
        )
    }
}

export default withRouter(Layout);