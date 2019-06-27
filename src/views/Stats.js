import React from "react";
import {Card, Row, Col} from "react-materialize";
import {LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, Label} from "recharts";
import Layout from "components/layout/Layout";
import {app} from 'app/app';
import 'static/styles/stats.css'

export class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            teams: [],
            messages: [],
            users: [],
            usersByDate: [],
            messagesQuantity: 0,
        };

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.processData = this.processData.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        const usersResponse = response['users'];
        const messagesResponse = response['messages'];
        const teamsResponse = response['teams'];
        if (usersResponse.hasError() || messagesResponse.hasError() || teamsResponse.hasError()) {
            this.setState({loading: false});
        } else {
            this.setState({
                users: usersResponse.users(),
                usersByDate: usersResponse.usersByDate(),
                messages: messagesResponse.messagesByTeam(),
                messagesQuantity: messagesResponse.messagesQuantity(),
                teams: teamsResponse.teams()
            }, this.processData);
        }
    }

    processData() {
        this.state.messages.forEach(message => {
            message['team'] = this.state.teams.filter(team => team.id === message['team_id'])[0]['team_name'];
        });
        this.setState({loading: false});
    }


    componentDidMount() {
        app.apiClient().getStatsInitialData(this.handleInitialDataResponse);
    }

    content() {
        return (
            <div className="stats-container">
                <Row style={{"display": "flex", "flex-direction": "row"}}>
                    <Col m={4}>
                        <Card>
                            <span className="indicator-number">{this.state.users.length}</span>
                            <span className="indicator-text"> usuarios</span>
                        </Card>
                    </Col>
                    <Col m={4}>
                        <Card>
                            <span className="indicator-number">{this.state.teams.length}</span>
                            <span className="indicator-text"> equipos</span>
                        </Card>
                    </Col>
                    <Col m={4}>
                        <Card>
                            <span className="indicator-number">{this.state.messagesQuantity}</span>
                            <span className="indicator-text"> mensajes enviados</span>
                        </Card>
                    </Col>
                </Row>
                <Row style={{"background-color": "white", "padding": "30px"}}>
                    <h4>Usuarios creados (último mes)</h4>
                    <LineChart width={750} height={300} data={this.state.usersByDate}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day">
                            <Label value="Días del mes" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="monotone" dataKey="users" stroke="#8884d8"/>
                    </LineChart>
                </Row>
                <Row style={{"background-color": "white", "padding": "30px"}}>
                    <h4>Mensajes enviados</h4>
                    <BarChart width={750} height={300} data={this.state.messages}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="team">
                            <Label value="Equipo" offset={0} position="insideBottom"/>
                        </XAxis>
                        <YAxis/>
                        <Tooltip/>
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="channel" fill="#8884d8"/>
                        <Bar dataKey="direct" fill="#82ca9d"/>
                    </BarChart>
                </Row>
            </div>
        )
    }

    render() {
        return <Layout content={this.content} loading={this.state.loading}/>;
    }
}