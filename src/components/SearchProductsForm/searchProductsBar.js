import React, { useRef, useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import "./searchProductsForm.css";
import * as Utils from "../../utils";

function SearchProductsBar(props) {
    const { placeHolder, searchIndex } = props;
    const refInputSearch = useRef();
    const [action, setAction] = useState("");
    useEffect(() => {
        if (searchIndex === Utils.SEARCH_FROM_PRODUCT) {
            setAction(`${window.location.pathname}/result/all`);
        } else if (searchIndex === Utils.SEARCH_FROM_RESULT) {
            setAction(window.location.pathname);
        }
    }, [searchIndex]);

    const handleClickSearch = (e) => {
        e.preventDefault();
        const searchKeywords = refInputSearch.current["keywords"].value;
        window.location.href = `${action}?keywords=${searchKeywords}`;
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <form ref={refInputSearch} action={action}>
                    <Input placeholder={placeHolder} className="input-search" name="keywords" />
                    <Button type="button" className="btn-search" onClick={handleClickSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SearchProductsBar;
