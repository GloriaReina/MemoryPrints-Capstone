import React, { useState } from "react";

const DeleteJournal = ({ handleDeleteJournal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteButtonClick = () => {
    handleDeleteJournal();
    setConfirmDelete(false);
  };

  if (confirmDelete) {
    return (
      <div>
        <p>Are you sure you want to delete this journal?</p>
        <button onClick={handleDeleteButtonClick}>Delete</button>
        <button onClick={() => setConfirmDelete(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirmDelete(true)}>Delete Journal</button>
  );
};

export default DeleteJournal;
