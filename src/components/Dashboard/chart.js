import React from "react";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
function Chart() {
  return (
    <div>
      <div className="chart-panel ml-4 mt-5">
        <div className="card p-3" style={{ height: "400px" }}>
          <div className="d-flex">
            <div className="panel-icon">
              <FontAwesomeIcon
                icon={faChartLine}
                className="top-panel-color"
                style={{ fontSize: "20px" }}
              />
            </div>
            <h5>sales, costs</h5>
          </div>

          <blockquote className="blockquote mb-0 card-body">
            <p>Chart.js</p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
              </small>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Chart;
