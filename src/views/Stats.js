import React from "react";
import {Card, Row, Col} from "react-materialize";
import {LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar} from "recharts";
import Layout from "components/layout/Layout";
import {app} from 'app/app';
import 'static/styles/stats.css'

export class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            plotting: false,
            teams: [],
            users: [],
        };

        this.data = [
            {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "uv": 3000,
                "pv": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "uv": 2000,
                "pv": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "uv": 2780,
                "pv": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "uv": 1890,
                "pv": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "uv": 2390,
                "pv": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "uv": 3490,
                "pv": 4300,
                "amt": 2100
            }
        ];

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        const usersResponse = response['users'];
        const messagesResponse = response['messages'];
        if (usersResponse.hasError() || messagesResponse.hasError()) {
        } else {
            this.setState({users: usersResponse.users(), messages: messagesResponse.messagesByTeam()});
        }
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
                            <span className="indicator-number">5.000</span>
                            <span className="indicator-text"> usuarios</span>
                        </Card>
                    </Col>
                    <Col m={4}>
                        <Card>
                            <span className="indicator-number">30</span>
                            <span className="indicator-text"> equipos</span>
                        </Card>
                    </Col>
                    <Col m={4}>
                        <Card>
                            <span className="indicator-number">1.000</span>
                            <span className="indicator-text"> canales</span>
                        </Card>
                    </Col>
                </Row>
                <Row style={{"background-color": "white", "padding": "30px"}}>
                    <h4>Usuarios creados</h4>
                    <LineChart width={750} height={300} data={this.data}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    </LineChart>
                </Row>
                <Row style={{"background-color": "white", "padding": "30px"}}>
                    <h4>Mensajes enviados</h4>
                    <BarChart width={750} height={300} data={this.state.messages}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="team_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="channel" fill="#8884d8" />
                        <Bar dataKey="direct" fill="#82ca9d" />
                    </BarChart>
                </Row>
            </div>
        )
    }

    render() {
        return <Layout content={this.content} loading={this.state.loading}/>;
    }
}