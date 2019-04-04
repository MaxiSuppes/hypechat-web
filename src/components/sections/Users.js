import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from "@material-ui/core/CircularProgress";
import "static/styles/layout/layout.css";
import {app} from 'utils/appConfig';

export class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            users: []
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({users: []});
        } else {
            this.setState({users: response.users(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getUsers(this.props.organizationId, this.handleApiResponse);
    }

    content() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nombre de usuario</TableCell>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(user => (
                                <TableRow key={user.userName}>
                                    <TableCell align="center">{user.userName}</TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">------------</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="loading-content">
                    <CircularProgress variant='indeterminate' color={"#283f52"}/>
                </div>
            )
        } else {
            return this.content();
        }
    }
}