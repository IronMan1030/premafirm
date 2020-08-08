import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Images(props) {
    return (
        <div>
            {props.tabActive === 4 && (
                <Container className="block-data-list">
                    <Row>
                        <div className="d-flex justify-items-center">
                            <Col xs={12} md={6}>
                                <div className="block-big-img-product">
                                    <div className="block-validate-product">
                                        <img
                                            src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                            alt=""
                                            className="icon-product"
                                        />
                                    </div>
                                    <img
                                        src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                        alt=""
                                        className="img-product"
                                    />
                                </div>
                            </Col>

                            <Row className="block-content">
                                <Col xs={6} md={5} className="mb-4">
                                    <div className="block-little-img-product">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={5} className="mb-4">
                                    <div className="block-little-img-product">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={5}>
                                    <div className="block-little-img-product mb-4">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={5}>
                                    <div className="block-little-img-product mb-4">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>

                                <Col xs={6} md={5}>
                                    <div className="block-little-img-product mb-4">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={5}>
                                    <div className="block-little-img-product mb-4">
                                        <div className="block-validate-product">
                                            <img
                                                src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                alt=""
                                                className="icon-product"
                                            />
                                        </div>
                                        <img
                                            src="https://media.but.fr/images_produits/produit-niv3/3216383128683_Q.jpg"
                                            alt=""
                                            className="img-product"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default Images;
