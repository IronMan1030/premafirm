import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductStatus(props) {
    return (
        <div>
            <div className="chart-panel ml-4 mt-5">
                <div className="card p-3">
                    <div className="d-flex">
                        <div className={props.productStatus.color}>
                            <FontAwesomeIcon icon={props.productStatus.icon} className="top-panel-color" />
                        </div>
                    </div>
                    <div className="product-status-panel">
                        <p>{props.productStatus.title}</p>
                    </div>
                    <div
                        className="product-status-panel h-line"
                        style={{ borderColor: "#dedede", marginBottom: "20px" }}
                    >
                        <span>{props.productStatus.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductStatus;
