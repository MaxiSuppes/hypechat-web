import React from "react";
import Layout from "components/layout/Layout";

export class Home extends React.Component {
    organizationsId() {
        return this.props.match.params['organizationId'];
    }

    render() {
        return <Layout organizationId={this.organizationsId()}/>;
    }
}