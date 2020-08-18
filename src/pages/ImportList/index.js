import React, { useState, useEffect } from "react";
import ImportListForm from "../../components/ImportListForm/importListForm";
import axios from "axios";
import * as Utils from "../../utils";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import SpinnerView from "../../components/spinnerView";

let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

function ImportList() {
    const [originProducts, setOriginProducts] = useState([]);
    const [isProcessing, setProcessing] = useState(false);

    useEffect(() => {
        const getOriginProducts = async () => {
            const apiUrlByProducts = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/list/${sessionUserInfo._id}`;
            setProcessing(true);
            let response = await axios.get(apiUrlByProducts);
            setProcessing(false);
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                setOriginProducts(response.data);
            }
        };
        getOriginProducts();
    }, []);

    return (
        <div className="mr-4">
            <p className="menu-title">Import List</p>
            {!originProducts.length ? (
                <h3 className="text-center p-font-dark">Your import list is empty.</h3>
            ) : (
                <div>
                    <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_KEYWORDS} />
                    <div className="container mt-5">
                        {originProducts.map((product, index) => {
                            return <ImportListForm key={index} originProduct={product} />;
                        })}
                    </div>
                </div>
            )}
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default ImportList;
