import React from "react";
import {Menu} from "./SideMenu";
import {Organization} from "components/sections/Organization";
import {Users} from "components/sections/Users";
import {Channels} from "components/sections/Channels";
import {ForbiddenWords} from "components/sections/ForbiddenWords";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import "static/styles/layout/layout.css";
import {styles} from "static/styles/layout/layout.js";
import {withStyles} from "@material-ui/core/styles";


class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            activeSection: {
                id: 1,
                name: "Editar"
            }
        };


        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }

    handleDrawerOpen() {
        this.setState({open: true});
    };

    handleDrawerClose() {
        this.setState({open: false});
    };

    selectOption(sectionId, sectionName) {
        const section = {id: sectionId, name: sectionName};
        this.setState({activeSection: section});
    };

    section() {
        switch (this.state.activeSection.id) {
            case 1:
                return <Organization organizationId={this.props.organizationId}/>;
            case 2:
                return <Channels/>;
            case 3:
                return <Users/>;
            case 4:
                return <ForbiddenWords/>;
        }
    }

    render() {
        return (
            <div className="container">
                <AppBar position="absolute"
                        className={classNames(this.props.classes.appBar,
                            {[this.props.classes.appBarShift]: this.state.open})}>
                    <Toolbar disableGutters={!this.state.open} className='toolbar'>
                        <IconButton
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames('main-button', {'menu-button-hidden': this.state.open})}>
                            <MenuIcon />
                        </IconButton>
                        <p className="section-title">{this.state.activeSection.name}</p>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(this.props.classes.drawerPaper,
                            {[this.props.classes.drawerPaperClose]: !this.state.open})
                    }}
                    open={this.state.open}>
                    <div className='toolbar-icon'>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Menu onSelectOption={this.selectOption} optionSelected={this.state.activeSection.id}/>
                </Drawer>
                <main className='content'>
                    {this.section()}
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Layout);