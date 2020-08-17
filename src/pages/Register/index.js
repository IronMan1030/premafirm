import React, { useRef, useState } from "react";
import { Image, Form, Button, Alert } from "react-bootstrap";
import "./index.css";
import * as Utils from "../../utils";
import axios from "axios";
import SpinnerView from "../../components/spinnerView";

function Register() {
    const refEmail = useRef();
    const refPassword = useRef();
    const [alertData, setAlertData] = useState(null);
    const [isProcessing, setProcessing] = useState(false);

    const handleClickRegister = async () => {
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
        const nodeSeverApiUrl = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/user/add`;
        setProcessing(true);
        let response = await axios.post(nodeSeverApiUrl, { email: userEmail, password: password });
        setProcessing(false);
        console.log(response);
        if (response.data.error) {
            setAlertData(response.data.error);
            return;
        }
        sessionStorage.setItem(Utils.SESSION_STORE_OWNER, JSON.stringify(response.data));
        window.location.href = "/dashboard";
    };

    return (
        <div className="container">
            <div className="d-flex mt-5 justify-content-center mr-3">
                <Image src="/images/logo.png" className="mr-2" width={50} height={35} />
                <h4 className="ml-2">Premafirm</h4>
            </div>
            <h3 className="mt-4 text-center">Create your account</h3>
            <div className="mt-5 register-form">
                {alertData && <Alert variant="danger">{alertData}</Alert>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={refEmail} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={refPassword} />
                </Form.Group>
                <Button variant="outline-success" type="submit" className="mt-2" onClick={handleClickRegister}>
                    Sign up
                </Button>
                <div className="text-center mt-4">
                    By clicking Sign Up, you agree to our <a href="/#">Terms of Service and Privacy Policy</a>.
                </div>
            </div>

            <div className="d-flex mt-4 justify-content-center">
                <p>Already have an account?</p>
                <a href="/">Sign in</a>
            </div>
            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default Register;
