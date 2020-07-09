import React, { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

export default class AddComingWithModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thank you for Coming
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container"></div>
          Are you coming with someone?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
