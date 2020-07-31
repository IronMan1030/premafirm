import React from "react";
import "./dashboard.css";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
function Notification(props) {
  return (
    <div>
      <div className="chart-panel mt-5 d-flex align-items-center ">
        <Image src={props.notification.image} className="mr-2" width={70} />
        <p className="pt-3">{props.notification.title}</p>
        <span className="ml-5">8</span>
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </div>
    </div>
  );
}

export default Notification;
