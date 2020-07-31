import React from "react";
import Input from "@material-ui/core/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import "./searchProductForm.css";
function SearchProductsBar() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Input
          placeholder="Search for products to sell"
          className="input-search"
        />
      </div>
      <Button type="button" className="btn-search">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
}

export default SearchProductsBar;
