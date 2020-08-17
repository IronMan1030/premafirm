import React from "react";
import "./index.css";
import { Spinner } from "react-bootstrap";

function SpinnerView() {
    return (
        <div className="spinner-view">
            <Spinner animation="border" />
        </div>
    );
}

export default SpinnerView;
