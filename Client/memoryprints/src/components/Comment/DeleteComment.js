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
        <button className='btn--outline' onClick={handleDeleteButtonClick}>Delete</button>
        <button className='btn--outline' onClick={() => setConfirmDelete(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <button className='btn--outline' onClick={() => setConfirmDelete(true)}>Delete Comment</button>
  );
};

export default DeleteComment;