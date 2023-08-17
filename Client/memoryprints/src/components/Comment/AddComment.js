import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addComment } from "../../Managers/CommentManager";
import "./AddComment.css"

export const AddComment = ({ journalId, setShowAddCommentForm}) => {
  const [comment, setComment] = useState({
    content: "",
    journal:"",
    userId: 0 // fetch it from local storage system?
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    const localAppUser = localStorage.getItem("user");
    const AppUserObject = JSON.parse(localAppUser);
    const userId = AppUserObject.id;

    const commentToSendToAPI = {
      Content: comment.content,
      JournalId:journalId,
      UserId: +userId
    };

    addComment(commentToSendToAPI).then(() => {
      // Comment added successfully, close the form
      setShowAddCommentForm(false);
    });
  };

  const handleCancel = () => {
    // Close the form without adding a comment
    setShowAddCommentForm(false);
  };

  return (
    <div className="modal-container">
    <Modal show={true} onHide={handleCancel}>
      <Modal.Header >
        <Modal.Title>Create a New Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="comment-form" onSubmit={handleSubmit}>
          <fieldset>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <input
                type="text"
                id="content"
                value={comment.content}
                onChange={(event) =>
                  setComment({ ...comment, content: event.target.value })
                }
              />
            </div>
          </fieldset>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="cancel-addComment" variant="success" onClick={handleCancel}>
          X
        </Button>
        <Button className="submit-addComment" variant="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};
