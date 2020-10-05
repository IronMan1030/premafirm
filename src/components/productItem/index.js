import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./index.css";
import axios from "axios";

import * as Utils from "../../utils";

function ProductItem(props) {
  const { product } = props;

  let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));
  const [isAddedToList, setAddedToList] = useState(false);

  useEffect(() => {
    let sessionProductsIds = JSON.parse(sessionStorage.getItem(Utils.SESSION_PRODUCT_IDS));

    let resultByFilter = sessionProductsIds && sessionProductsIds.filter((productId) => productId === product.id);
    if (resultByFilter && resultByFilter.length) {
      setAddedToList(true);
    } else {
      setAddedToList(false);
    }
  }, [product]);

  const handleImageClick = (productId) => {
    window.open(`/products/searchProduct/productDetail/${productId}`);
  };

  const handleClickAdd = async () => {
    let newVariants = product.product_variant_ids.map((variant) => {
      let colorValue = variant.product_template_attribute_value_ids.find((obj) => obj.attribute_name.includes("Color"))
        ?.name;
      const generateSku = Math.floor(Math.random() * Date.now());
      let v = { ...variant, sku: colorValue ? `${new Date().getTime()} - ${colorValue}` : generateSku.toString() };

      return v;
    });
    let newProduct = { ...product, product_variant_ids: newVariants };
    try {
      let result = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/add`, {
        userId: sessionUserInfo._id,
        product: newProduct,
      });
      if (result.data.error) {
        console.log(result.data.error);
      } else {
        let sessionProductsIds = JSON.parse(sessionStorage.getItem(Utils.SESSION_PRODUCT_IDS)) ?? [];
        sessionProductsIds = [...sessionProductsIds, result.data.originProduct.id];
        sessionStorage.setItem(Utils.SESSION_PRODUCT_IDS, JSON.stringify(sessionProductsIds));
        setAddedToList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {product && (
        <Card className="panel-style" style={{ margin: "12px" }}>
          {product && product.ept_image_ids[0] && product.ept_image_ids[0].url ? (
            <Card.Img
              variant="top"
              src={product.ept_image_ids[0].url}
              onClick={() => handleImageClick(product.id)}
              className="cursor"
            />
          ) : (
            ""
          )}
          <Card.Body>
            <div style={{ lineHeight: "0" }} className="mt-2 mb-3">
              <div className="d-flex p-font-dark">
                {product.attribute_line_ids &&
                  product.attribute_line_ids.map((attr, index) => {
                    return (
                      <div className="d-flex" key={index}>
                        {index > 0 ? <p className="pl-2">|</p> : ""}
                        <p className={index > 0 ? "pl-2" : ""}>{attr.value_ids.length}</p>
                        <p className="pl-2">{attr.display_name === "Size" ? "Sizes" : "Colours"}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* <Link
                            to={`/products/searchProduct/productDetail/${product.id}`}
                            className="mt-3 p-font-dark"
                        >
                            <p className="ellipsis">{product.name}</p>
                        </Link> */}
            <div className="mt-3 p-font-dark">
              <p className="ellipsis">{product.name}</p>
            </div>
            <p className="p-font-dark mt-2 mb-3">CAD ${product.list_price}</p>
            {isAddedToList ? (
              <Button
                onClick={() => {
                  window.location.href = "/products/importList";
                }}
                variant="outline-secondary"
                style={{ width: "100%" }}
              >
                Edit on Import List
              </Button>
            ) : (
              <Button onClick={() => handleClickAdd()} variant="outline-success">
                Add to Import List
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ProductItem;
