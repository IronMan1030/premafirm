import React, { useRef, useState } from "react";
import "./index.css";
import { Image, Form, Button, Alert } from "react-bootstrap";
import SpinnerView from "../../components/spinnerView";
import * as Utils from "../../utils";
import axios from "axios";

function LoginForm() {
    const refEmail = useRef();
    const refPassword = useRef();
    const [alertData, setAlertData] = useState(null);
    const [isProcessing, setProcessing] = useState(false);

    const handleClickLogin = async () => {
        let userEmail = refEmail.current.value;
        let password = refPassword.current.value;
        let valid = Utils.checkEmail(userEmail);
        if (valid.code !== 0) {
            setAlertData(valid.msg);
            return;
        }
        if (!password) {
            setAlertData("The password should not be empty!");
            return;
        }
        const nodeSeverApiUrl = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/user/login`;
        setProcessing(true);
        let response = await axios.post(nodeSeverApiUrl, { email: userEmail, password: password });
        setProcessing(false);
        
        if (response.data.error) {
            setAlertData(response.data.error);
            return;
        }
        sessionStorage.setItem(Utils.SESSION_STORE_OWNER, JSON.stringify(response.data[0]));
        window.location.href = "/dashboard";
    };

    return (
        <div>
            <div className="login-background"></div>
            <div className="login-form">
                <div className="d-flex mt-5 justify-content-center mr-3">
                    <Image src="/images/logo.png" className="mr-2" width={50} height={35} />
                    <h4 className="ml-2">Premafirm</h4>
                </div>
                <h3 className="mt-4 text-center">Log in to your account</h3>

                <div className="mt-5 ml-5 mr-5">
                    {alertData && <Alert variant="danger">{alertData}</Alert>}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={refEmail} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={refPassword} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit" className="mt-2" onClick={handleClickLogin}>
                        Log In
                    </Button>
                </div>
                <div className="d-flex mt-4 justify-content-center">
                    <p>Don't have an account?</p>
                    <a href="/register">Sign up</a>
                </div>
            </div>
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default LoginForm;
