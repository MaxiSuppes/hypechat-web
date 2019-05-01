import React from 'react';
import {Layout} from "../components/layout/Layout";
import {app} from '../utils/appConfig';

export class ForbiddenWords extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            forbiddenWords: []
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({forbiddenWords: []});
        } else {
            this.setState({forbiddenWords: response.forbiddenWords(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getForbiddenWords(this.organizationId(), this.handleApiResponse);
    }

    organizationId() {
        return this.props.match.params['organizationId'];
    }

    content() {
        return (
            <ul>
                {this.state.forbiddenWords.map(word => <li>{word}</li>)}
            </ul>
        )
    }

    render() {
        return <Layout organizationId={this.organizationId()} content={this.content()} loading={this.state.loading}/>;
    }
}