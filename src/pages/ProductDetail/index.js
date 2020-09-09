import React, { useState, useEffect } from "react";
import "./index.css";
import { Container, Row, Col } from "reactstrap";
import { Button, Image } from "react-bootstrap";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import * as Utils from "../../utils";

function ProductDetail(props) {
  let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

  const [singleProduct, setSingleProduct] = useState([]);
  const [isAddedToList, setAddedToList] = useState(false);

  useEffect(() => {
    const paramProductId = props.match.params.productId;
    let sessionProductsIds = JSON.parse(sessionStorage.getItem(Utils.SESSION_PRODUCT_IDS));

    let resultByFilter =
      sessionProductsIds && sessionProductsIds.filter((productId) => productId === parseInt(paramProductId));
    if (resultByFilter && resultByFilter.length) {
      setAddedToList(true);
    } else {
      setAddedToList(false);
    }
    getProduct(paramProductId);
  }, [props]);

  const getProduct = async (productId) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/product.template?domain=[(%27id%27,%27=%27,${productId})]`;
    let response = await axios.get(apiUrl, {
      auth: {
        username: process.env.REACT_APP_BATH_AUTH_USERNAME,
        password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
      },
    });
    setSingleProduct(response.data[0]);
  };

  const images =
    singleProduct.ept_image_ids &&
    singleProduct.ept_image_ids.map((image) => {
      return { original: image.url, thumbnail: image.url };
    });

  const handleClickImport = async () => {
    console.log("click import", sessionUserInfo);
    try {
      let result = await axios.post(`${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/add`, {
        userId: sessionUserInfo._id,
        product: singleProduct,
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
    <div className="p-font-dark">
      <p className="menu-title">Product Details</p>
      <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_FOR_PRODUCTS} searchIndex={1} />
      <Container className="mt-5 panel-style">
        <Row className="p-4">
          <Col lg="6">
            <div className="product-details-slider-content">{images && <ImageGallery items={images} />}</div>
          </Col>
          <Col lg="6">
            <h2 className="title-font-size">{singleProduct.name}</h2>
            {isAddedToList ? (
              <Button
                onClick={() => {
                  window.location.href = "/products/importList";
                }}
                variant="outline-secondary"
                style={{ maxWidth: "40%" }}
              >
                Edit on Import List
              </Button>
            ) : (
              <Button
                variant="outline-success"
                className="mt-2"
                style={{ maxWidth: "30%" }}
                onClick={handleClickImport}
              >
                Add to Import List
              </Button>
            )}
            <hr />
            <h4 className="mt-3">CAD $ {singleProduct.standard_price}</h4>
            <p>{singleProduct.description}</p>
            <hr />
            <div className="row">
              <div className="col-md-1">
                <p>Color:</p>
              </div>
              <div className="col-md-10">
                {singleProduct.product_variant_ids &&
                  singleProduct.product_variant_ids.map((item) => {
                    let colors = item.product_template_attribute_value_ids.filter(
                      (obj) => obj.attribute_name === "Color"
                    ).length;
                    if (colors > 0) {
                      return (
                        <Image
                          key={item.id}
                          src={item.ept_image_ids[0].url}
                          width={50}
                          height={50}
                          className="ml-3 mt-2 mb-2"
                        ></Image>
                      );
                    }
                  })}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-1">
                <p>Size:</p>
              </div>
              <div className="col-md-10">
                {singleProduct.attribute_line_ids &&
                  singleProduct.attribute_line_ids.map((attribute, index) => {
                    if (attribute.display_name === "Size") {
                      return (
                        <div key={index} className="ml-3">
                          {attribute.value_ids.map((value, index) => (
                            <span className="btn-size" key={index}>
                              {value.name}
                            </span>
                          ))}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <hr />
            <p>Shipping</p>
            <hr />
            <p>{singleProduct.qty_available} in stock</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
