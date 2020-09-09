import React, { useState, useEffect } from "react";
import "./importListForm.css";
import { Button } from "react-bootstrap";

import Description from "./description";
import Product from "./product";
import Variants from "./variants";
import Images from "./images";
import axios from "axios";
import SpinnerView from "../../components/spinnerView";
import * as Utils from "../../utils";

function ImportListForm(props) {
  const { originProduct } = props;
  const [tabActive, setTabActive] = useState(1);
  const [postProduct, setPostProduct] = useState([]);
  const [isProcessing, setProcessing] = useState(false);

  useEffect(() => {
    let initProduct =
      originProduct &&
      [originProduct].map((product) => {
        let newVariants = product.originProduct.product_variant_ids.map((variant) => {
          let colorValue = variant.product_template_attribute_value_ids.find((obj) =>
            obj.attribute_name.includes("Color")
          )?.name;
          let v = {
            option1: colorValue,
            price: variant.list_price,
            sku: `${new Date().getTime()} - ${colorValue}`,
          };
          return v;
        });
        let newProduct = {
          product: {
            title: product.originProduct.name,
            body_html: product.originProduct.description,
            vendor: "Nelson",
            product_type: "",
            variants: newVariants,
          },
        };
        return newProduct;
      });
    setPostProduct(initProduct[0]);
  }, [originProduct]);

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

  const handleSaveProduct = (product) => {
    let newProduct = { ...postProduct };
    newProduct.product = product;
    setPostProduct(newProduct);
  };

  const handleSaveDesc = (desc) => {
    let newProduct = { ...postProduct };
    newProduct.product.body_html = desc;
    setPostProduct(newProduct);
  };

  const handleSaveVariants = (value) => {
    let newVariants = value.map((variant) => {
      let v = { option1: "first", price: variant.list_price, sku: variant.sku };
      return v;
    });

    let newProduct = { ...postProduct };
    newProduct.product.variants = newVariants;
    setPostProduct(newProduct);
  };

  const handleSaveImages = (images) => {
    console.log(images);
  };

  // const handleClickStore = async () => {
  //   console.log(postProduct);
  //   let response = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/import/product`, {
  //     shop: "permadev.myshopify.com",
  //     product: postProduct,
  //   });
  //   if (response.data.error) {
  //     console.log(response.data.error);
  //   } else {
  //     console.log(response.data);
  //   }
  // };

  const handleClickStore = async () => {
    // console.log(postProduct);
    let testProduct = {
      product: {
        title: "Abby Toddler Bed",
        body_html: "<p>test</p>",
        vendor: "Nelson",
        product_type: "",
        variants: [
          {
            option1: "blue",
            option2: "153",
            price: "10.00",
            sku: "123",
          },
          {
            option1: "black",
            option2: "155",
            price: "20.00",
            sku: "123",
          },
        ],
      },
    };
    try {
      let response = await axios.get(`https://permadev.myshopify.com/admin/api/2020-07/products.json`, {
        headers: {
          "X-Shopify-Access-Token": "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",
          "content-type": "application/json",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickRemove = async (pId) => {
    setProcessing(true);
    let response = await axios.get(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/delete/${pId}`);
    setProcessing(false);
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      let sessionProductIds = JSON.parse(sessionStorage.getItem(Utils.SESSION_PRODUCT_IDS));
      let resultPIds = sessionProductIds.filter((obj) => obj !== originProduct.originProduct.id);
      sessionStorage.setItem(Utils.SESSION_PRODUCT_IDS, JSON.stringify(resultPIds));
      window.location.href = "/products/importList";
    }
  };

  return (
    <div id="section-lists" className="ml-5 mr-4 mb-3">
      <div className="d-flex justify-content-center">
        {btnList}
        <div className="block-btns ml-5">
          <Button
            className="mr-3 bg-pink border-none border-radius-none"
            onClick={() => handleClickRemove(originProduct._id)}
          >
            Remove
          </Button>
          <Button variant="danger bg-green border-none border-radius-none" onClick={handleClickStore}>
            Import to store
          </Button>
        </div>
      </div>
      <div className="line-row"></div>

      <Product
        tabActive={tabActive}
        originTitle={originProduct.originProduct.name}
        originMainImage={originProduct.originProduct.ept_image_ids[0].url}
        handleSaveProduct={handleSaveProduct}
      />
      <Description
        tabActive={tabActive}
        originDesc={originProduct.originProduct.description}
        handleSaveDesc={handleSaveDesc}
      />
      <Variants
        tabActive={tabActive}
        originVariants={originProduct.originProduct.product_variant_ids}
        handleSaveVariants={handleSaveVariants}
      />
      <Images
        tabActive={tabActive}
        originImages={originProduct.originProduct.ept_image_ids}
        handleSaveImages={handleSaveImages}
      />
      {isProcessing && <SpinnerView />}
    </div>
  );
}

export default ImportListForm;
