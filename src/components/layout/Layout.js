import React from "react";
import {Icon, Navbar, NavItem, Preloader, SideNav, SideNavItem} from "react-materialize";
import "../../static/styles/layout.css";
import noImage from "../../static/images/no-image.png"
import defaultUserImage from "../../static/images/default-user.png"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {app} from "../../app/app";
import {withRouter} from "react-router-dom";

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
            console.log("No se pudo desloguear");
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
                <div>
                    <Preloader size="big" />
                </div>
            )
        } else {
            return this.props.content();
        }
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Navbar className="nav-bar"
                        brand={
                            <a className="brand-logo" href={/teams/}>
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
                            options={{ closeOnClick: true }}>
                            <SideNavItem userView
                                         user={{
                                             background: noImage,
                                             image: defaultUserImage,
                                             name: this.userName(),
                                         }}/>
                            <SideNavItem href={/teams/ + this.props.teamId + /users/}>
                                Usuarios
                            </SideNavItem>
                            <SideNavItem href={/teams/ + this.props.teamId + /channels/}>
                                Canales
                            </SideNavItem>
                            <SideNavItem href={/teams/ + this.props.teamId + /words/}>
                                Palabras prohibidas
                            </SideNavItem>
                            <SideNavItem divider/>
                            <SideNavItem href='/teams'>
                                Cambiar de equipo
                            </SideNavItem>
                        </SideNav>
                    </NavItem>
                </Navbar>
                <main>
                    {this.renderContent()}
                </main>
            </div>
        )
    }
}

export default withRouter(Layout);