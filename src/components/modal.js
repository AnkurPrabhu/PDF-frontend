import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";
import { getToken, postAccess } from "./helper/apicalls";
import copy from "copy-to-clipboard";
const CenteredModal = (props) => {
  const [email, setEmail] = useState("");
  const [genToken, setGenToken] = useState("");
  const [error, setError] = useState("");
  const argument = useParams().argument;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleGenerate = (e) => {
    e.preventDefault();

    getToken(argument).then((data) => {
      if (data.error) {
        console.log("error:", data.error);
        setError(
          "Error : " +
            data.error +
            " (only authenticated users can generate tokens)"
        );
      } else {
        setGenToken(
          window.location.protocol +
            "/" +
            window.location.host +
            "/token/" +
            data.token
        );
        setError("");
      }
    });
  };
  const handleShare = (e) => {
    e.preventDefault();

    let body = {
      email: email,
      fileId: props.fileid,
    };

    postAccess(body).then((data) => {
      console.log(data);
      if (data.error) {
        setError(
          "Error : " +
            data.error +
            " (only authenticated users can generate tokens)"
        );
      } else {
        setError("");
      }
    });
  };
  const handleCopy = (e) => {
    e.preventDefault();

    copy(genToken);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Generate Access Token
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error.length > 0 && <Alert variant="danger">{error}</Alert>}
        <h4>Centered Modal</h4>
        <p>
          The generated token will give access to <b> UNAUTHENTICATED </b> users
          too,share the access token with trusted members only
        </p>
      </Modal.Body>
      <Row className=" generate-token-sec  justify-content-left align-items-center  ">
        <Col xs lg="2">
          <Button onClick={handleGenerate}>Generate</Button>
        </Col>
        <Col xs lg="8">
          <Form.Control
            type="text"
            value={genToken}
            aria-label="Disabled input example"
            readOnly
          />
        </Col>
        <Col xs lg="1">
          <Button variant="light" onClick={handleCopy}>
            <FaCopy />
          </Button>
        </Col>
      </Row>
      <Row className=" generate-token-sec   align-items-center  ">
        <Col xs lg="2">
          <div>authenticated User?</div>
        </Col>
        <Col xs lg="8">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Col>
        <Col xs lg="1">
          <Button variant="light" onClick={handleShare}>
            Share
          </Button>
        </Col>
      </Row>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default CenteredModal;
