import React, { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";

import { uploadFile } from "./helper/apicalls";
import NavbarComponent from "./navbar";
const Fileupload = () => {
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileurl, setFileurl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [error, setError] = useState("");
  const [isuploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFilenameChange = (e) => {
    setFilename(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    console.log(file);
    if (!file) {
      setError("no file uploaded");
      return;
    }
    let randomnum = Math.floor(Math.random() * 100000000000);
    const storageRef = ref(storage, `files/${randomnum}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileurl(downloadURL);

            let body = {
              filename: filename,
              description: description,
              fileurl: downloadURL,
            };

            uploadFile(body).then((data) => {
              if (data.error) {
                console.log(data.error);
                setSuccess(false);
                setError("Error : " + data.error);
                setIsUploading(false);
              } else {
                setSuccess(true);
                setIsUploading(false);
                setError("");
              }
            });
          });
        }
      );
    } catch (err) {
      console.log(err);
      setError("error uploading file please try again");
    }
  };

  return (
    <div>
      <div className="main__bg "> </div>
      <NavbarComponent />
      <div className="d-flex justify-content-center align-items-center vh-100  ">
        <div className="login-container  ">
          <Form onSubmit={handleFileUpload}>
            {error.length > 0 && <Alert variant="danger">{error}</Alert>}
            {success > 0 && (
              <Alert variant="success">Success: File Uploaded </Alert>
            )}
            <Form.Group controlId="formfilename">
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Normal text"
                value={filename}
                onChange={handleFilenameChange}
                autoComplete="off"
              />
            </Form.Group>
            <p> </p>
            <Form.Group className="mb-3" controlId="formfiledescription">
              <Form.Label>File Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={handleDescriptionChange}
                autoComplete="off"
              />
            </Form.Group>
            <p></p>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload you file</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
              />
            </Form.Group>
            <p></p>
            {isuploading && (
              <ProgressBar
                variant="success"
                now={progresspercent}
                label={`${progresspercent}%`}
                visuallyHidden
              />
            )}

            <p></p>
            <Button variant="primary" type="submit">
              upload
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
