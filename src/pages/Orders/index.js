import React from "react";
import * as Utils from "../../utils";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import axios from "axios";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import "./index.css";

function Orders() {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="mr-4">
            <p className="menu-title">Order</p>
            <div className="mt-4 mb-4">
                <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_KEYWORDS} />
            </div>
            <div className="ml-4 p-font-dark">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-between" alignItems="flex-end">
                        <p className="title-font-size mb-2">Your orders for 2020-07-20 - 2020-08-20</p>
                        <div className="justify-content d-flex">
                            <div className="mr-2">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Start"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </div>
                            <div>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline-end"
                                    label="End"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>
                </MuiPickersUtilsProvider>
                <Card>
                    <Card.Header>Order #1009 2020 08-18</Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="shipping-card">
                                <Card.Text>Shipped</Card.Text>
                            </div>
                            <Card.Text>Order NO: 12345</Card.Text>
                            <Card.Text>Tracking Code: LY91253555</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="ml-4 mt-4 p-font-dark ">
                <Card>
                    <Card.Header>Order #1009 2020 08-18</Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="order-card">
                                <Card.Text>To Order</Card.Text>
                            </div>
                            <button className="order-button">Order Products</button>
                        </div>
                        <div className="ml-4 mr-4 mt-3 order-item">
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <div className="d-flex">
                                        <Image
                                            src="http://premafirm.com/lf/i/Mjk="
                                            alt="order-pic"
                                            width={70}
                                            height={70}
                                        ></Image>
                                        <div className="align-items-center ml-2" style={{ display: "grid" }}>
                                            <Card.Text>Comfortable Sets</Card.Text>
                                            <Card.Text>BN32</Card.Text>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>Gold</Col>
                                <Col md={3}>No Tracking Number 1</Col>
                                <Col md={3}>
                                    <Card.Text>$300</Card.Text>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <div className="d-flex">
                                        <Image
                                            src="http://premafirm.com/lf/i/Mjk="
                                            alt="order-pic"
                                            width={70}
                                            height={70}
                                        ></Image>
                                        <div className="align-items-center ml-2" style={{ display: "grid" }}>
                                            <Card.Text>Comfortable Sets</Card.Text>
                                            <Card.Text>BN32</Card.Text>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>Gold</Col>
                                <Col md={3}>No Tracking Number 1</Col>
                                <Col md={3}>
                                    <Card.Text>$300</Card.Text>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Orders;
