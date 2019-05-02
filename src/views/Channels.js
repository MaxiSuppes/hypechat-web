import React from 'react';
import {Layout} from "../components/layout/Layout";
import {CollectionItem, Row, Collection} from "react-materialize";
import {app} from '../utils/appConfig';

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
        app.apiClient().getChannels(this.organizationId(), this.handleApiResponse);
    }

    organizationId() {
        return this.props.match.params['organizationId'];
    }

    content() {
        return (
            <Row style={{maxWidth: "700px"}}>
                <Collection>
                    {this.state.channels.map(channel => {
                        return (
                            <CollectionItem>
                                <span className="title">
                                    {channel}
                                </span>
                            </CollectionItem>
                        )
                    })}
                </Collection>
            </Row>
        )
    }

    render() {
        return <Layout organizationId={this.organizationId()} content={this.content()} loading={this.state.loading}/>;
    }
}