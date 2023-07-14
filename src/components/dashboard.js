import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import { getAllFiles } from "./helper/apicalls";
import Pdfview from "./pdfview";
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "./navbar";

const Dashboard = () => {
  // let files = [
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },

  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  //   {
  //     filenane: "file_name",
  //     description: "some dummy description",
  //     Owner: "owner of file",
  //   },
  // ];
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const loadAllfiles = () => {
    getAllFiles().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data.files);
        setFiles(data.files);
      }
    });
  };

  const handleSubmit = (e) => {
    navigate(`/pdfview/${e}`);
  };

  useEffect(() => {
    loadAllfiles();
  }, []);

  const FileCard = ({ element }) => {
    return (
      <Card>
        <Card.Header>{element.filename}</Card.Header>
        <Card.Body>
          <Card.Title>{element.Owner}</Card.Title>
          <Card.Text>{element.description}</Card.Text>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSubmit(element._id);
            }}
          >
            Open PDF
          </Button>

          {/* <Link
            to={`/fileupload/${element.fileurl.substring(
              element.fileurl.indexOf("f")
            )}`}
          >
            Go to Other Route
          </Link> */}
        </Card.Body>
      </Card>
    );
  };

  let filesresults = files.map((element, i) => {
    return <FileCard element={element} keys={i} />;
  });

  return (
    <div>
      <div className="main__bg "> </div>
      <NavbarComponent />
      <div className="d-flex justify-content-center align-items-center  vh-100">
        <Container className=" pdf-container  pdf-view">
          {files.length === 0 ? (
            <Row>No file uploaded </Row>
          ) : (
            <Row>{filesresults}</Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
