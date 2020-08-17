import React from "react";
import Input from "@material-ui/core/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import "./searchProductsForm.css";
function SearchProductsBar(props) {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <Input placeholder={props.placeHolder} className="input-search" />
                <Button type="button" className="btn-search">
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </div>
        </div>
    );
}

export default SearchProductsBar;
