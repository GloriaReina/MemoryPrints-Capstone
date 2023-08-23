import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { editComment } from "../../Managers/CommentManager";




const EditComment = ({ comment, handleSaveEdit, handleCancelEdit}) => {
  const [editedComment, setEditedComment] = useState({
    content: comment.content
  });

  const handleCancelClick = () => {
    //  close the edit form
    handleCancelEdit();
  };

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    editComment(comment.id, editedComment)
      .then(() => {
        // After put request,method below=> refreshes the commentlist & closes form
        handleSaveEdit();

      });
  };

  return (
    <Modal show={true} onHide={handleCancelClick}>
    <Modal.Header >
      <Modal.Title>Edit Comment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            type="text"
            required
            value={editedComment.content}
            onChange={(event) =>
              setEditedComment({
                ...editedComment,
                content: event.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" className="save-edit-button" onClick={handleSaveButtonClick}>
        Save
      </Button>
      <Button variant="success" className="cancel-edit-button" onClick={handleCancelClick}>
          X
        </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default EditComment;

{/* <Form className="edit-comment-form">
      <h4 className="edit-comment-form-title">Edit Comment</h4>
      <Form.Group className="comment-form-group">
        <Form.Label className="comment-form-label">Content:</Form.Label>
        <Form.Control
          type="text"
          required
          value={editedComment.content}
          onChange={(event) =>
            setEditedComment({ ...editedComment, content: event.target.value })
          }
        /> 
      </Form.Group> 
      <Button
        variant="success"
        className="save-edit-button"
        onClick={handleSaveButtonClick}
      > Save 
      </Button> 
      <Button
        variant="success"
        className="cancel-edit-button"
        onClick={handleCancelClick}
      >
        Cancel
      </Button> 
    </Form> */}