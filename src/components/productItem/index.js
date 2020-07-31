import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function ProductItem() {
  return (
    <div>
      <Card style={{ width: "16rem" }} className="panel-style">
        <Card.Img variant="top" src="/images/products/gloves.jpg" />
        <Card.Body>
          <Link to="">
            <p className="ellipsis">
              Magic Silicone Dishwashing Scrubber Dish Washing Sponge Rubber
              Scrub Gloves Kitchen Cleaning 1 Pair
            </p>
          </Link>
          <p className="p-font-dark">US $3.55</p>
          <div style={{ lineHeight: "0" }}>
            <div className="d-flex justify-content-between mini-font-size p-font-dark">
              <p>Imports</p>
              <p>16026</p>
            </div>
            <div className="d-flex justify-content-between mini-font-size p-font-dark">
              <p>Pageviews</p>
              <p>0</p>
            </div>
            <div className="d-flex justify-content-between mini-font-size p-font-dark">
              <p>Orders</p>
              <p>3889</p>
            </div>
          </div>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductItem;
