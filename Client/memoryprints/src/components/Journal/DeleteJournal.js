import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./DeleteJournal.css"

const DeleteJournal = ({ journalId, journal, handleDeleteJournal }) => {
  const [showModal, setShowModal] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    const localAppUser = localStorage.getItem("user");
    const appUserObject = JSON.parse(localAppUser);

    if (appUserObject && appUserObject.id === journal.userId) {
      setCanDelete(true);
    } else {
      setCanDelete(false);
    }
  }, [journal.userId]); // Added journal.userId as a dependency to the useEffect

  const handleDeleteButtonClick = () => {
    handleDeleteJournal(journalId);
    setShowModal(false);
  };

  return (
    <>
      {canDelete && (  // Show the following content only when canDelete is true
        <>
          <Button className='btn--outline' onClick={() => setShowModal(true)}>Delete Journal</Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Body>
              <p className="confirm-text">Are you sure you want to delete this journal?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="success" onClick={handleDeleteButtonClick}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default DeleteJournal;





// import React, { useState } from "react";


// const DeleteJournal = ({ journalId, handleDeleteJournal }) => {
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleDeleteButtonClick = () => {
//     handleDeleteJournal(journalId);
//     setConfirmDelete(false);
//   };

//   if (confirmDelete) {
//     return (
//       <div>
//         <p>Are you sure you want to delete this journal?</p>
//         <button className='btn--outline' onClick={handleDeleteButtonClick}>Delete</button>
//         <button className='btn--outline' onClick={() => setConfirmDelete(false)}>Cancel</button>
//       </div>
//     );
//   }

//   return (
//     <button  className='btn--outline' onClick={() => setConfirmDelete(true)}>Delete Journal</button>
//   );
// };

// export default DeleteJournal;
