import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChannelsIcon from '@material-ui/icons/MessageOutlined';
import ForbiddenWordsIcon from '@material-ui/icons/HighlightOffOutlined';
import UsersIcon from '@material-ui/icons/PersonOutline';
import EditIcon from '@material-ui/icons/EditOutlined';
import "static/styles/layout/layout.css";


export class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.isSelected = this.isSelected.bind(this);
    }

    isSelected(sectionId) {
        return this.props.optionSelected === sectionId;
    }

    render() {
        return (
            <List>
                <div>
                    <ListItem button onClick={() => this.props.onSelectOption(1, "Editar")}
                              selected={this.isSelected(1)}>
                        <ListItemIcon>
                            <EditIcon className="item-icon"/>
                        </ListItemIcon>
                        <ListItemText>
                            <p className="item-text">Editar</p>
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => this.props.onSelectOption(2, "Canales")}
                              selected={this.isSelected(2)}>
                        <ListItemIcon>
                            <ChannelsIcon className="item-icon"/>
                        </ListItemIcon>
                        <ListItemText>
                            <p className="item-text">Canales</p>
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => this.props.onSelectOption(3, "Usuarios")}
                              selected={this.isSelected(3)}>
                        <ListItemIcon>
                            <UsersIcon className="item-icon"/>
                        </ListItemIcon>
                        <ListItemText>
                            <p className="item-text">Usuarios</p>
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => this.props.onSelectOption(4, "Palabras prohibidas")}
                              selected={this.isSelected(4)}>
                        <ListItemIcon>
                            <ForbiddenWordsIcon className="item-icon"/>
                        </ListItemIcon>
                        <ListItemText>
                            <p className="item-text">Palabras prohibidas</p>
                        </ListItemText>
                    </ListItem>
                </div>
            </List>
        )
    }
}