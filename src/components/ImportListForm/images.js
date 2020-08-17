import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Images(props) {
    const { originImages } = props;
    
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
                                        src={originImages[0].url}
                                        alt=""
                                        className="img-product"
                                        style={{ maxHeight: "380px" }}
                                    />
                                </div>
                            </Col>

                            <Row className="block-content">
                                {originImages.map((image) => {
                                    
                                    return (
                                        <Col xs={6} md={5} className="mb-4" key={image.id}>
                                            <div className="block-little-img-product">
                                                <div className="block-validate-product">
                                                    <img
                                                        src="https://www.edumilestones.com/ccis/static/tick_icon.png"
                                                        alt={`tick${image.id}`}
                                                        className="icon-product"
                                                    />
                                                </div>
                                                <img src={image.url} alt={`pic${image.id}`} className="img-product" />
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default Images;
