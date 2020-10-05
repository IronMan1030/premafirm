import React, { useState, useRef } from "react";
import { Row, Col, Media, Form } from "react-bootstrap";

function Product(props) {
  const { originTitle, originMainImage } = props;
  const refTitle = useRef();
  const refCollections = useRef();
  const refType = useRef();
  const refTags = useRef();

  const handleChangeProduct = (e) => {
    const productInfo = {
      title: refTitle.current.value,
      // collection: refCollections.current.value,
      // vendor: "Nelson",
      product_type: refType.current.value,
      tags: [refTags.current.value],
    };
    props.handleSaveProduct(productInfo);
  };
  return (
    <div className="block-data-list">
      {props.tabActive === 1 && (
        <div className="d-flex">
          <Col className="" xs={5} md={3}>
            <Media>
              <img
                width={230}
                height={230}
                className="align-self-end"
                src={originMainImage}
                alt="Ecologic toothbrush"
              />
            </Media>
          </Col>
          <Col xs={9} md={9}>
            <Media>
              <Media.Body>
                <div className="d-flex justify-content-between">
                  <p>
                    <b>Original title:</b>
                  </p>
                  {/* <Link to="/">View original product </Link> */}
                </div>

                <p className="mb-2">{originTitle}</p>

                {/* <p>
                                    By : <Link to="/">Bamboo World</Link>,<Link to="/"> Store (AliExpress)</Link>
                                </p> */}

                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Change the title</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={refTitle}
                      defaultValue={originTitle}
                      onChange={handleChangeProduct}
                    />
                    <Form.Label className="mt-4">
                      <b>Collections</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search for collections"
                      ref={refCollections}
                      onChange={handleChangeProduct}
                    />

                    <Row className="d-flex  mt-4">
                      <Col>
                        <Form.Label>
                          <b>Type</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Select type"
                          ref={refType}
                          onChange={handleChangeProduct}
                        />
                      </Col>
                      <Col>
                        <Form.Label>
                          <b>Tags</b>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Search for tags"
                          ref={refTags}
                          onChange={handleChangeProduct}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Media.Body>
            </Media>
          </Col>
        </div>
      )}
    </div>
  );
}

export default Product;
