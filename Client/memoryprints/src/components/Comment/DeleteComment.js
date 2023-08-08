import React, { useState } from "react";

const DeleteComment = ({ handleDeleteCommentFnc }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteButtonClick = () => {
    handleDeleteCommentFnc();
    setConfirmDelete(false);
  };

  if (confirmDelete) {
    return (
      <div>
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={() => setConfirmDelete(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirmDelete(true)}>Delete Comment</button>
  );
};

export default DeleteComment;