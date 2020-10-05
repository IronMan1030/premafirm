import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import "./index.css";
function DetailTicket() {
  return (
    <div className="mr-4">
      <div className="menu-title">Details Ticket</div>
      <div className="container mt-5 open-ticket panel-style">
        <table className="table-section ">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan Ebersbacher (minidolls1030@gmail.com) opened this ticket (Oct 5 2020)</td>
            </tr>
            <tr>
              <td>
                Jan Ebersbacher (minidolls1030@gmail.com) wrote: <br /> dfdfdf dfdff
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <p className="mb-2">Add a reply or close the ticket</p>
        <Form.Row>
          <Col>
            <Form.Control as="textarea" rows={3} />
          </Col>
        </Form.Row>
        <br />
        <Button variant="outline-success" style={{ width: "150px" }}>
          Reply
        </Button>
      </div>
    </div>
  );
}

export default DetailTicket;
