import React, { useState } from "react";
import "./importListForm.css";
import { Button } from "react-bootstrap";

import Description from "./description";
import Product from "./product";
import Variants from "./variants";
import Images from "./images";
// import axios from "axios";

// import * as Utils from "../../utils";
// let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

function ImportListForm(props) {
    const { originProduct } = props;

    const [tabActive, setTabActive] = useState(1);

    const handleChangeTab = (id) => {
        setTabActive(id);
    };

    const tabs = [
        {
            id: 1,
            iconList: "",
            tabName: "Product",
        },
        {
            id: 2,
            iconList: "",
            tabName: "Description",
        },
        {
            id: 3,
            iconList: "",
            tabName: "Variants",
        },
        {
            id: 4,
            iconList: "",
            tabName: "Images",
        },
    ];

    const btnList = tabs.map((tab) => {
        return (
            <div key={tab.id} className="data" onClick={() => handleChangeTab(tab.id)}>
                <div className="lists-data">
                    <h6 className="icon-list">{tab.icon}</h6>
                    <p className={tab.id === tabActive ? "name-list is-active" : "name-list"}>{tab.tabName}</p>
                </div>
            </div>
        );
    });

    return (
        <div id="section-lists" className="ml-5 mr-4 mb-3">
            <div className="d-flex justify-content-center">
                {btnList}
                <div className="block-btns ml-5">
                    <Button className="mr-3 bg-pink border-none border-radius-none">Remove</Button>
                    <Button variant="danger bg-green border-none border-radius-none">Import to store</Button>
                </div>
            </div>
            <div className="line-row"></div>

            <Product
                tabActive={tabActive}
                originTitle={originProduct.originProduct.name}
                originMainImage={originProduct.originProduct.ept_image_ids[0].url}
            />
            <Description tabActive={tabActive} originDesc={originProduct.originProduct.description} />
            <Variants tabActive={tabActive} originVariants={originProduct.originProduct.product_variant_ids} />
            <Images tabActive={tabActive} originImages={originProduct.originProduct.ept_image_ids} />
        </div>
    );
}

export default ImportListForm;
