import React, { useEffect } from "react";
import { Container, Row, Col, Media, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
function Product(props) {
    console.log(props.tabActive);
    return (
        <div className="block-data-list">
            {props.tabActive === 1 && (
                <Container>
                    <div className="d-flex">
                        <Col className="" xs={5} md={3}>
                            <Media>
                                <img
                                    width={230}
                                    height={230}
                                    className="align-self-end"
                                    src="https://ae01.alicdn.com/kf/HTB13UIXV6DpK1RjSZFrq6y78VXaN/Paquet-de-5-brosses-dents-en-bambou-pour-adultes-soies-souples-cologiques-cepillo-dientes-bambu-brosse.jpg"
                                    alt="Ecologic toothbrush"
                                />
                            </Media>
                        </Col>
                        <Col xs={9} md={9}>
                            <Media>
                                <Media.Body>
                                    <div className="d-flex justify-content-between">
                                        <p>
                                            <b>Original title</b>
                                        </p>
                                        <Link to="/">
                                            View original product{" "}
                                        </Link>
                                    </div>

                                    <p>
                                        New design mixed color bamboo toothbrush
                                        eco friendly wooden tooth brush soft
                                        bristle tip charcoal adults oral care
                                        toothbrush.
                                    </p>

                                    <p>
                                        By : <Link to="/">Bamboo World</Link>,{" "}
                                        <Link to="/"> Store (AliExpress)</Link>
                                    </p>

                                    <Form>
                                        <Form.Group>
                                            <Form.Label>
                                                <b>Change the title</b>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value="New design mixed color bamboo toothbrush eco friendly wooden tooth brush soft bristle tip charcoal adults oral care toothbrush."
                                            />
                                            <Form.Label className="mt-4">
                                                <b>Collections</b>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search for collections"
                                            />

                                            <Row className="d-flex  mt-4">
                                                <Col>
                                                    <Form.Label>
                                                        <b>Type</b>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Select type"
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label>
                                                        <b>Tags</b>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Search for tags"
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                </Media.Body>
                            </Media>
                        </Col>
                    </div>
                </Container>
            )}
        </div>
    );
}

export default Product;
