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
          <strong><em> {comment?.user?.displayName}</em></strong>
        </p>
        <p>{comment?.content}</p>
        <p>Written On: {formattedCreationDate}</p>
        {appUserObject && appUserObject.id === comment.userId && (
        <div className="center-buttons">
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
            <button className='btn--outline' onClick={handleEditButtonClick}>Edit Comment</button>
          )}
        </div>
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
