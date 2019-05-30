import React from "react";
import {SideNav, SideNavItem, NavItem, Navbar, Icon, Preloader} from "react-materialize";
import "../../static/styles/layout.css";
import noImage from "../../static/images/no-image.png"
import defaultUserImage from "../../static/images/default-user.png"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Layout extends React.Component {
    userName() {
        return sessionStorage.getItem("userName");
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
                <Navbar className="nav-bar" left>
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
                        <SideNavItem href={this.props.teamId + '/users'}>
                            Usuarios
                        </SideNavItem>
                        <SideNavItem divider/>
                        <SideNavItem href='/teams'>
                            Cambiar de equipo
                        </SideNavItem>
                    </SideNav>
                </Navbar>
                <main>
                    {this.renderContent()}
                </main>
            </div>
        )
    }
}