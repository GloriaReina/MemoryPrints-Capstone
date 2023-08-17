import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const DeleteComment = ({ handleDeleteCommentFnc }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteButtonClick = () => {
    handleDeleteCommentFnc();
    setShowModal(false);
  };

  return (
    <>
      <Button className='btn--outline' onClick={() => setShowModal(true)}>Delete Comment</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header >
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" className="delete-comment-button" onClick={() => setShowModal(false)}>Delete</Button>
          <Button variant="success" className="cancel-edit-button" onClick={handleDeleteButtonClick}>
          X
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComment;