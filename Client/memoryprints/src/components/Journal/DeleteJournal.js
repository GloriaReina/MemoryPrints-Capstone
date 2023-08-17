import React, { useState } from "react";


const DeleteJournal = ({ journalId, handleDeleteJournal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteButtonClick = () => {
    handleDeleteJournal(journalId);
    setConfirmDelete(false);
  };

  if (confirmDelete) {
    return (
      <div>
        <p>Are you sure you want to delete this journal?</p>
        <button className='btn--outline' onClick={handleDeleteButtonClick}>Delete</button>
        <button className='btn--outline' onClick={() => setConfirmDelete(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <button  className='btn--outline' onClick={() => setConfirmDelete(true)}>Delete Journal</button>
  );
};

export default DeleteJournal;
