import React from "react";
import { Button } from "react-bootstrap";
import "./ticket.css";

function OpenTicket() {
  const handleClickTicket = (index) => {
    console.log(index);
    window.location.href = "/helpCenter/ticket/detail";
  };
  return (
    <div className="container mt-3 open-ticket panel-style">
      {/* <div className="header">
        <p className="ticket-title">Open Tickets</p>
      </div> */}
      <table className="table-section">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Subject</th>
            <th>Date Created</th>
            <th>Last Action</th>
          </tr>
        </thead>
        <tbody>
          <tr onClick={() => handleClickTicket(1)}>
            <td>Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
          </tr>
          <tr onClick={() => handleClickTicket(2)}>
            <td>Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
            <td className="info-block">Visa - 3412</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OpenTicket;
