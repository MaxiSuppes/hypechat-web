import React from "react";
import {Button, Icon, Modal, Row, ProgressBar} from "react-materialize";

export class ConfirmationModal extends React.Component {
    constructor(props) {
        super(props);

        this._modal = undefined;
    }

    hideModal() {
        this._modal.hideModal();
    }

    renderActions() {
        if (this.props.loading) {
            return (
                <Row>
                    <ProgressBar/>
                </Row>
            )
        } else {
            return [
                <Button className="button" modal="close" style={{"marginRight": "10px"}} small> Cancelar </Button>,
                <Button className="button" onClick={this.props.handleConfirm} small> Confirmar </Button>
            ]
        }
    }

    render() {
        return (
            <Modal ref={(ref) => this._modal = ref} header={this.props.header} trigger={this.props.trigger}
                   actions={this.renderActions()}>
                {this.props.text}
            </Modal>
        )
    }
}

ConfirmationModal.defaultProps = {
    trigger: (
        <a href="javascript:void(0)" className="secondary-content">
            <Icon>
                delete
            </Icon>
        </a>
    ),
};
