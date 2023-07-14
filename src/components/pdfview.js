import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import {
  getComments,
  getfile,
  postComment,
  postReply,
} from "./helper/apicalls";
import { FaReply, FaRegComment } from "react-icons/fa";
import NavbarComponent from "./navbar";
import CenteredModal from "./modal";

const Pdfview = () => {
  // let comment = [
  //   {
  //     name: "ali ahmad",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  //   {
  //     name: "ankur",
  //     comment: "hey thats great",
  //     replies: [
  //       {
  //         name: "ali ahmad",
  //         comment: "yep sure",
  //       },
  //       {
  //         name: "al faz",
  //         comment: "yes i too think so",
  //       },
  //     ],
  //   },
  // ];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [file, setFile] = useState({
    title: "",
    description: "",
    id: "",
    fileurl: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [replymode, setReplymode] = useState(false);
  const [parent, setParent] = useState("");

  const argument = useParams().argument;
  const loadfile = () => {
    getfile(argument).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFile(data.file);
      }
    });
  };

  const loadComment = () => {
    getComments(argument).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setComments(data.comments);
      }
    });
  };

  useEffect(() => {
    loadfile();
    loadComment();
  }, []);

  const CommentCard = ({ element }) => {
    return (
      <Container className="comment-card ">
        {element._doc.userId && <Row> {element._doc.userId.name} :</Row>}

        <Row>{element._doc.comment}</Row>
        <Row>
          <Button
            variant="light"
            onClick={() => {
              setParent(element._doc._id);
              setReplymode(true);
            }}
            className="comment-reply bg-transparent"
          >
            <FaReply />
          </Button>
        </Row>
      </Container>
    );
  };

  const ReplyCard = ({ element }) => {
    return (
      <Container className="comment--reply  ">
        {element.userId && <Row> {element.userId.name} :</Row>}

        <Row>{element.comment}</Row>
        <Row>
          <Button
            variant="light"
            onClick={() => {
              setParent(element.parentCommentId);
              setReplymode(true);
            }}
            className="comment-reply bg-transparent"
          >
            <FaReply />
          </Button>
        </Row>
      </Container>
    );
  };

  function makereplies(element) {
    let replies = element.map((element, i) => {
      return <ReplyCard element={element} keys={i} />;
    });

    return replies;
  }

  let commentresult = comments.map((element, i) => {
    let replies = makereplies(element.replies);

    return (
      <Container>
        <div>
          <CommentCard element={element} keys={i} />
          <div className=""> {replies}</div>
        </div>
      </Container>
    );
  });

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };
  const handlePostComment = (e) => {
    e.preventDefault();

    if (commentText === "") {
      return;
    }
    console.log("hey");
    let body = {
      fileId: file._id,
      comment: commentText,
    };
    postComment(body).then((data) => {
      if (data.error) {
        console.log(data.error);
        setSuccess(false);
        setError("Error : " + data.error);
      } else {
        loadComment();
        setSuccess(true);
        setCommentText("");
        setError("");
      }
    });
  };
  const handlePostReply = (e) => {
    e.preventDefault();
    if (commentText === "") {
      return;
    }

    let body = {
      fileId: file._id,
      reply: commentText,
      parentCommentId: parent,
    };

    postReply(body).then((data) => {
      if (data.error) {
        console.log(data.error);
        setSuccess(false);
        setError("Error : " + data.error);
      } else {
        setReplymode(false);
        loadComment();
        setSuccess(true);
        setCommentText("");
        setError("");
      }
    });
  };
  const pdfURL = file.fileurl;

  return (
    <div>
      <div className="main__bg "> </div>
      <NavbarComponent />

      <div className="d-flex justify-content-center align-items-center  vh-100">
        <Container className="pdf-view-container ">
          <Row className="share-access-btn">
            <Button variant="light" onClick={() => setModalShow(true)}>
              Share Access
            </Button>

            <CenteredModal
              fileid={file._id}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Row>
          <Row>
            <Col className=" pdf-container  ">
              {isLoading && <div>Loading...</div>}
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                  pdfURL
                )}&embedded=true`}
                title="PDF Viewer"
                frameBorder="0"
                width="100%"
                height="100%"
                onLoad={handleIframeLoad}
              />
            </Col>

            <Col className="comment-container  " xs lg="2">
              <h1>Comments</h1>
              <Row className="comment-height pdf-view " id="style-1">
                {commentresult}
              </Row>

              <Row className=" commentting-container  align-items-center  ">
                <Col xs lg="1">
                  <Button
                    className="none"
                    variant="light"
                    onClick={() => {
                      setReplymode(false);
                    }}
                  >
                    <FaRegComment />
                  </Button>
                </Col>
                <Col xs lg="9" sm={7}>
                  <Form.Control
                    className="typing"
                    type="text"
                    id="inputPassword5"
                    placeholder="Write your comment...."
                    value={commentText}
                    onChange={handleCommentChange}
                  />
                </Col>
                <Col xs lg="1">
                  {replymode ? (
                    <Button
                      variant="Light"
                      type="submit"
                      onClick={handlePostReply}
                    >
                      Reply
                    </Button>
                  ) : (
                    <Button
                      variant="Light"
                      type="submit"
                      onClick={handlePostComment}
                    >
                      Post
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Pdfview;
