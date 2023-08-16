import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import "./Comment.css"

export const Comment = ({ comment,handleDeleteCommentFnc, fetchCommentsByJournal}) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    fetchCommentsByJournal();
    setShowEditForm(false); 
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

const createDateTime = new Date(comment.creationDate);
const formattedCreationDate = createDateTime.toLocaleDateString();

const localAppUser = localStorage.getItem("user");
const appUserObject = JSON.parse(localAppUser);


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
        {appUserObject && appUserObject.id === comment.userId && (
          <>
            <DeleteComment
              handleDeleteCommentFnc={handleDeleteCommentFnc}
              comment={comment}
            />
            {showEditForm ? (
              <EditComment
                comment={comment}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
              />
            ) : (
              <button onClick={handleEditButtonClick}>Edit Comment</button>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

 {/* <DeleteButton handleDeleteCommentFnc ={handleDeleteCommentFnc} /> */}
        {/* {showEditForm ? (
        <EditCommentForm
          comment={comment}
          fetchCommentsByJournal={fetchCommentsByJournal}
        />
      ) : (
        <button onClick={handleEditButtonClick}>Edit Comment</button>
      )} */}

        {/* <Button>
          <Link to={`/journals/${journal.id}/comments`}>Add Comment</Link>
        </Button> */}
        {/* <Button><Link to={`/journals/${journal.id}/comments/edit`}>Edit Comment</Link></Button> */}
