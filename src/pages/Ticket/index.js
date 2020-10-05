import React, { useState } from "react";
import OpenTickets from "../../components/Ticket/openTicket";
import CloseTickets from "../../components/Ticket/closeTicket";
import "./index.css";

function Ticket() {
  const [tabActive, setTabActive] = useState(1);
  const tabs = [
    {
      id: 1,
      tabName: "Open Tickets",
    },
    {
      id: 2,
      tabName: "Close Tickets",
    },
  ];

  const TabButtons = tabs.map((tab) => {
    return (
      <div key={tab.id} className="mr-4" onClick={() => setTabActive(tab.id)}>
        <p className={tab.id === tabActive ? "title is-active" : "title"}>{tab.tabName}</p>
      </div>
    );
  });

  return (
    <div className="mr-4 ticket-section">
      <div className="menu-title">Open Support Ticket</div>
      <div className="container mt-5">
        <div className="d-flex justify-content-around">
          {TabButtons}
          <div className="">
            <button
              type="button"
              className="btn btn-outline-success"
              style={{ minWidth: "130px" }}
              onClick={() => (window.location.href = "/helpCenter/ticket/create")}
            >
              Create
            </button>
          </div>
        </div>
      </div>

      {tabActive === 1 ? <OpenTickets /> : <CloseTickets />}
    </div>
  );
}

export default Ticket;
