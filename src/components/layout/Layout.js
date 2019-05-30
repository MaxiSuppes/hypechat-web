import React from "react";
import {SideNav, SideNavItem, NavItem, Navbar, Icon, Preloader} from "react-materialize";
import "../../static/styles/layout.css";

export class Layout extends React.Component {
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
                                         background: 'https://placeimg.com/640/480/tech',
                                         image: 'https://placeimg.com/640/480/tech',
                                         name: 'John Doe',
                                     }}/>
                        <SideNavItem href="/2/users">
                            Usuarios
                        </SideNavItem>
                        <SideNavItem href="/2/channels">
                            Canales
                        </SideNavItem>
                        <SideNavItem href="/2/words">
                            Palabras
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