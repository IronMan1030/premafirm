import React, { useState, useEffect } from "react";
import "./importListForm.css";
import { Button } from "react-bootstrap";

import Description from "./description";
import Product from "./product";
import Variants from "./variants";
import Images from "./images";

function ImportListForm() {
    const [variantsLists, setVariantsLists] = useState(false);
    const [tabActive, setTabActive] = useState(1);

    const detailsImportList = {
        product: true,
        description: false,
        variants: false,
        images: false,
        marketing: false,
    };

    const variantsList = {
        useall: true,
        sku: false,
        color: false,
        cost: false,
        shipping: false,
        price: false,
    };

    const handleChangeTab = (id) => {
        setTabActive(id);
    };

    const tabs = [
        {
            id: 1,
            iconList: "",
            tabName: "Product",
            isActive: 1,
        },
        {
            id: 2,
            iconList: "",
            tabName: "Description",
            isActive: 2,
        },
        {
            id: 3,
            iconList: "",
            tabName: "Variants",
            isActive: 3,
        },
        {
            id: 4,
            iconList: "",
            tabName: "Images",
            isActive: 4,
        },
    ];

    const btnList = tabs.map((tab) => {
        return (
            <div
                key={tab.id}
                className="data"
                onClick={() => handleChangeTab(tab.id)}
            >
                <div className="lists-data">
                    <h6 className="icon-list">{tab.icon}</h6>
                    <p
                        className={
                            tab.isActive === tabActive
                                ? "name-list is-active"
                                : "name-list"
                        }
                    >
                        {tab.tabName}
                    </p>
                </div>
            </div>
        );
    });

    return (
        <div id="section-lists" className="ml-5 mr-4">
            <div className="d-flex justify-content-center">
                {btnList}
                <div className="block-btns ml-5">
                    <Button className="mr-3 bg-pink border-none border-radius-none">
                        Remove
                    </Button>
                    <Button variant="danger bg-green border-none border-radius-none">
                        Import to store
                    </Button>
                </div>
            </div>
            <div className="line-row"></div>

            <Product tabActive={tabActive} />
            <Description tabActive={tabActive} />
            <Variants tabActive={tabActive} />
            <Images tabActive={tabActive} />
        </div>
    );
}

export default ImportListForm;
