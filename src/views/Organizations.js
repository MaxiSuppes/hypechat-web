import React from "react";
import {Layout} from "../components/layout/Layout";
import {CollectionItem, Row, Collection} from "react-materialize";
import {app} from "../utils/appConfig";

export class Organizations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            organizations: {}
        };

        this.handleApiResponse = this.handleApiResponse.bind(this);
    }

    handleApiResponse(response) {
        if (response.hasErrors()) {
            this.setState({organizations: []});
        } else {
            this.setState({organizations: response.organizations(), loading: false});
        }
    }

    componentWillMount() {
        app.apiClient().getOrganizations(this.handleApiResponse);
    }

    content() {
        return (
            <Row style={{maxWidth: "700px"}}>
                <Collection>
                    {Object.keys(this.state.organizations).map(organizationId => {
                        let organization = this.state.organizations[organizationId];
                        return (
                            <CollectionItem className="avatar" href={`/${organizationId}/edit`}>
                                <img src={require(`../static/images/${organization.imageName}`)} alt="" className="circle"/>
                                <span className="title">
                                    {organization.name}
                                </span>
                                <p>
                                    {organization.description}
                                    <br/>
                                    {organization.creator}
                                </p>
                            </CollectionItem>
                        )
                    })}
                </Collection>
            </Row>
        )
    }

    render() {
        return <Layout content={this.content()} loading={this.state.loading}/>;
    }
}