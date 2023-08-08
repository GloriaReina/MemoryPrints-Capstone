import React, { useState, useEffect } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getJournalById } from "../Managers/JournalManager";
import CommentList from "./Comment/CommentList";
import { AddComment } from "./Comment/AddComment";

export const JournalDetails = () => {
  const [journal, setJournal] = useState({});
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();

  /* toggle function for controlling the visibility of the comment list:*/
  const toggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  useEffect(() => {
    getJournalById(id).then(setJournal);
  }, []);

  if (!journal) {
    return null;
  }

  const formattedCreationDate = new Date(
    journal.creationDate
  ).toLocaleDateString();

  return (
    <Col xs={8}>
      <Card
        className="journal-card"
        style={{ width: "30rem", border: "1px solid lightblue" }}
      >
        <Card.Body>
          <Card.Title>
            <Link to={`/homepage`}>
              <strong className="journal-title">
                {journal?.title}: ({formattedCreationDate})
              </strong>
            </Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <strong>{journal?.category?.name}</strong>
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <em>{journal?.content}</em>
          </Card.Subtitle>{" "}
          <br />
          <Card.Subtitle className="mb-2 text-muted">
            {" "}
            Gratitude:<em>{journal?.gratitude}</em>
          </Card.Subtitle>{" "}
          <br />
          <Card.Subtitle className="mb-2 text-muted">
            What will make today/tomorrow great: <em>{journal?.intention}</em>
          </Card.Subtitle>
          <br />
          {/* <Card.Link href="#">edit button?Modal</Card.Link>
                        <Card.Link href="#">Delete Button? Modal</Card.Link> */}
        </Card.Body>
        {showComments && <CommentList journalId={id} />}
        <Button onClick={toggleComments}>
          {showComments ? "Hide Comments" : "View Comments"}
        </Button>
        <AddComment journalId={id} />
      </Card>
    </Col>
  );
};



// import React from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
// import { Link } from "react-router-dom";
// import { getJournalById } from "../Managers/JournalManager";
// import {
//     Container,
//     Card,
//     Col,
//     Row
//   } from "react-bootstrap";
// // import CommentList from "../Comment/CommentList";
// // import { Comment } from "../Comment/Comment";

// export const JournalDetails = () => {

//         const [journal, setJournal] = useState();
//         const [showComments, setShowComments] = useState(false);
//         const { id } = useParams();

//         /* toggle function for controlling the visibility of the comment list:*/
//         const toggleComments = () => {
//           setShowComments((prevState) => !prevState);
//         };

//         useEffect(() => {
//           getJournalById(id).then(setJournal);
//         }, []);

//         if (!journal) {
//           return null;
//         }

//     return (
//     <Card style={{ width: '18rem' }} key={journal.id}>
//           <CardBody>
//             <CardTitle><b>Title: {journal.title}</b></CardTitle>
//             <CardText>
//             {journal.content}
//             </CardText>
//             <CardText>
//               journaled on: {journal.publishDateTime}
//               </CardText>
//             <CardText>
//             Created by: {journal?.userProfile?.displayName}
//             </CardText>
//           </CardBody>
//           <Button><Link to={`/journals/${journal.id}/comments`}>Add Comment</Link></Button>
//           {/* <Button><Link to={`/journals/${journal.id}/comments/edit`}>Edit Comment</Link></Button> */}

//           {showComments && <CommentList />}
//           <Button onClick={toggleComments}>
//             {showComments ? "Hide Comments" : "View Comments"}
//           </Button>
//           <Comment journal= {journal} />
//     </Card>
//     );
//     };
