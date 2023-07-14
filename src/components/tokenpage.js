import React, { useState, useEffect } from "react";

import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { getTokenAccess } from "./helper/apicalls";
const TokenPage = () => {
  const [file, setFile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useParams().token;

  const tokenAccess = () => {
    return getTokenAccess(token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFile(data.file);
        setIsLoading(false);
        console.log(data.file._id);
        window.location.href = `/pdfview/${data.file._id}`;
      }
    });
  };
  useEffect(() => {
    tokenAccess();
  }, []);

  return (
    <div>
      {" "}
      <div className="main__bg "> </div>Loading...
    </div>
  ); // Show a loading indicator until the login status is checked
};

export default TokenPage;
