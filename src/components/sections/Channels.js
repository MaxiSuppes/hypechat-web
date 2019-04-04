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

export class Channels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            channels: []
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({channels: []});
        } else {
            this.setState({channels: response.channels(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getChannels(this.props.organizationId, this.handleApiResponse);
    }

    content() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Canal</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.channels.map(channel => (
                                <TableRow key={channel}>
                                    <TableCell align="center">{channel}</TableCell>
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