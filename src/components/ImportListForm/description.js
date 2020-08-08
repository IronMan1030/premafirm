import React from "react";
import { Media } from "react-bootstrap";
function Description(props) {
    console.log(props.tabActive);
    return (
        <div>
            {props.tabActive === 2 && (
                <Media className="block-data-list">
                    <Media.Body>
                        <h2>Description</h2>
                    </Media.Body>
                </Media>
            )}
        </div>
    );
}

export default Description;
