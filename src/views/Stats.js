import React from "react";
import {Card, Row, Col} from "react-materialize";
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts";
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
                "pv": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "pv": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "pv": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "pv": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "pv": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "pv": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "pv": 4300,
                "amt": 2100
            }
        ];

        this.handleInitialDataResponse = this.handleInitialDataResponse.bind(this);
        this.content = this.content.bind(this);
    }

    handleInitialDataResponse(response) {
        if (response.hasError()) {
            this.setState({teams: []});
        } else {
            this.setState({teams: response.teams()}, () => {
                this.setState({actualTeam: this.team(), loading: false});
            });
        }
    }

    componentDidMount() {
        // app.apiClient().getTeams(this.handleInitialDataResponse);
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
            </div>
        )
    }

    render() {
        return <Layout content={this.content} loading={this.state.loading}/>;
    }
}