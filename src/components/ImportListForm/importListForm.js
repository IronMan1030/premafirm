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
  const [postImages, setPostImages] = useState([]);
  const [postVariants, setPostVariants] = useState([]);
  const [isProcessing, setProcessing] = useState(false);

  useEffect(() => {
    let initProduct =
      originProduct &&
      [originProduct].map((product) => {
        let newVariantList = setNewVariants(product.originProduct.product_variant_ids);

        let newImages = product.originProduct.ept_image_ids.map((image) => {
          return { src: image.url };
        });

        let newProduct = {
          product: {
            title: product.originProduct.name,
            body_html: product.originProduct.description,
            vendor: "Nelson",
            product_type: "",
            variants: newVariantList.newVariants,
            images: newImages,
            options: newVariantList.variantsOptions,
          },
        };
        return newProduct;
      });
    setPostProduct(initProduct[0]);
  }, [originProduct]);

  const setNewVariants = (variants) => {
    let newVariants = [];
    let colorValueList = [];
    let sizeValueList = [];
    let variantOptions = [];
    variants.map((variant) => {
      let colorValue = variant.product_template_attribute_value_ids.find((obj) => obj.attribute_name.includes("Color"))
        ?.name;
      let sizeValue = variant.product_template_attribute_value_ids.find((obj) => obj.attribute_name.includes("Size"))
        ?.name;
      let v = null;
      if (colorValue && sizeValue) {
        v = {
          option1: colorValue,
          option2: sizeValue,
          price: variant.list_price,
          sku: variant.sku,
          inventory_management: "shopify",
        };
        colorValueList.push(colorValue);
        sizeValueList.push(sizeValue);
      } else if (colorValue) {
        v = {
          option1: colorValue,
          price: variant.list_price,
          sku: variant.sku,
          inventory_management: "shopify",
        };
        colorValueList.push(colorValue);
      } else if (sizeValue) {
        v = {
          option1: sizeValue,
          price: variant.list_price,
          sku: variant.sku,
          inventory_management: "shopify",
        };
        sizeValueList.push(sizeValue);
      } else {
        v = {
          price: variant.list_price,
          sku: variant.sku,
          inventory_management: "shopify",
        };
      }
      newVariants.push(v);
    });

    if (colorValueList.length && sizeValueList.length) {
      variantOptions = [
        {
          name: "Color",
          values: colorValueList,
        },
        { name: "Size", values: sizeValueList },
      ];
    } else if (colorValueList.length) {
      variantOptions = [
        {
          name: "Color",
          values: colorValueList,
        },
      ];
    } else if (sizeValueList.length) {
      variantOptions = [{ name: "Size", values: sizeValueList }];
    }

    return { newVariants: newVariants, variantsOptions: variantOptions };
  };

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
    newProduct.product.title = product.title;
    newProduct.product.product_type = product.product_type;
    newProduct.product.tags = product.tags;
    setPostProduct(newProduct);
  };

  const handleSaveDesc = (desc) => {
    let newProduct = { ...postProduct };
    newProduct.product.body_html = desc;
    setPostProduct(newProduct);
  };

  const handleSaveVariants = (value) => {
    let variantList = setNewVariants(value);

    let newProduct = { ...postProduct };
    newProduct.product.variants = variantList.newVariants;
    newProduct.product.options = variantList.variantsOptions;
    setPostProduct(newProduct);
  };

  const handleSaveImages = (images) => {
    console.log(images);
  };

  const handleClickStore = async () => {
    setProcessing(true);

    // Get Location
    let responseLocations = null;
    try {
      responseLocations = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/locations`, {
        shop: "permadev.myshopify.com",
        token: "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",
      });
      if (responseLocations.data.error) {
        console.log(responseLocations.data.error);
        setProcessing(false);
        return;
      } else {
        console.log(responseLocations.data);
      }
    } catch (error) {
      setProcessing(false);
      console.log(error);
    }
    //Export Product
    console.log(postProduct);
    try {
      let response = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/export/product`, {
        shop: "permadev.myshopify.com",
        token: "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",
        product: postProduct,
      });
      response.data.product.variants.map(async (variant) => {
        let originVariant = originProduct.originProduct.product_variant_ids.find((obj) =>
          obj.sku.includes(variant.sku)
        );
        let originImage = originVariant && originVariant.ept_image_ids;
        if (originImage === undefined || originImage.length <= 0) {
          return;
        }
        let originImageName = originImage[0].url.split("/")[5];
        let imageId = response.data.product.images.find((obj) =>
          obj.src.includes(originImageName.substr(0, originImageName.length - 1))
        )?.id;
        let v = {
          variant: {
            id: variant.id,
            image_id: imageId,
          },
        };
        try {
          let responseVariants = await axios.post(
            `${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/export/variant`,
            {
              shop: "permadev.myshopify.com",
              token: "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",
              vId: variant.id,
              variant: v,
              inventoryItemId: variant.inventory_item_id,
              locationId: responseLocations.data.locations[0].id,
              quantity: originVariant.qty_available,
            }
          );
        } catch (error) {
          console.log(error);
        }
      });

      try {
        let responseToSave = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/product/update`, {
          productId: originProduct._id,
          product: response.data,
        });
        setProcessing(false);
        if (responseToSave.data.error) {
          console.log(responseToSave);
        } else {
          let sessionProductIds = JSON.parse(sessionStorage.getItem(Utils.SESSION_PRODUCT_IDS));
          const removedProductIds = sessionProductIds.filter((item) => item !== originProduct.originProduct.id);
          sessionStorage.setItem(JSON.stringify(removedProductIds));
          window.location.href = "/products/importList";
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    setProcessing(false);
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
