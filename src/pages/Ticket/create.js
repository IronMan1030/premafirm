import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import "./index.css";

function CreateTicket() {
  return (
    <div className="mr-4">
      <div className="menu-title">Create Ticket</div>
      <div className="container mt-5 create-ticket p-font-dark">
        <Form.Group>
          <Form.Row>
            <Form.Label column md={2}>
              Full name
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="Jhon Smith" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column md={2}>
              Requester
            </Form.Label>
            <Col>
              <Form.Control type="text" placeholder="example@email.com" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column md={2} className="pt-0">
              Your Store Url <span className="mini-font-size">(abc.myshopify.com)</span>
            </Form.Label>
            <Col>
              <Form.Control type="text" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column md={2}>
              Subject
            </Form.Label>
            <Col>
              <Form.Control type="text" />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column md={2}>
              Describe your project/request for us
            </Form.Label>
            <Col>
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Row>
          <br />
          <Form.Row className="mt-2">
            <Form.Label column md={2}></Form.Label>
            <Col>
              <Button variant="outline-success" className="btn-send">
                Send
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </div>
    </div>
  );
}

export default CreateTicket;
