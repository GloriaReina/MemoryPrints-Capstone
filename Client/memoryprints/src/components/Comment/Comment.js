import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
// import DeleteButton from "./DeleteButton";
// import EditCommentForm from "./EditCommentForm";



export const Comment = ({ comment,handleDeleteCommentFnc, fetchCommentsByJournal}) => {
//   const [showEditForm, setShowEditForm] = useState(false);

//   const handleEditButtonClick = (e) => {
//     e.preventDefault();
//     setShowEditForm(true);
//   };

const createDateTime = new Date(comment.creationDate);
    const formattedCreationDate = createDateTime.toLocaleDateString();

  return (
    <Card className="m-4" key={comment.id}>
      <p className="text-left px-2">
        <strong>{comment?.journal?.title}</strong>
      </p>
      <CardBody>
        <p>
          Author:<em> {comment?.user?.displayName}</em>
        </p>
        <p>Content: {comment?.content}</p>
        <p>Creation date: {formattedCreationDate}</p>
        {/* <DeleteButton handleDeleteCommentFnc ={handleDeleteCommentFnc} /> */}
        {/* {showEditForm ? (
        <EditCommentForm
          comment={comment}
          fetchCommentsByJournal={fetchCommentsByJournal}
        />
      ) : (
        <button onClick={handleEditButtonClick}>Edit Comment</button>
      )} */}
      </CardBody>
    </Card>
  );
};
