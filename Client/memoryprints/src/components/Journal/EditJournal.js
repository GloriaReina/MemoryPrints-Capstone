import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { editJournalEntry } from "../../Managers/JournalManager";
import { CategoryContext } from "../../Managers/CategoryManager";
import "./EditJournal.css";

const EditJournal = ({ journal, handleJournalEditRequest, handleCancelEditButtonClick }) => {
  const { getAllCategories, categories } = useContext(CategoryContext);
  const [canEdit, setCanEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [editedJournal, setEditedJournal] = useState({
    id: journal.id,
    title: journal.title,
    content: journal.content,
    gratitude: journal.gratitude,
    intention: journal.intention,
    categoryId: journal.categoryId,
  });

  useEffect(() => {
    getAllCategories();

    // Check if the current user is the creator of the journal
    if (appUserObject && appUserObject.id === journal.userId) {
      setCanEdit(true);
    } else {
      setShowAlert(true); // Show the alert if the user doesn't have permission
    }
  }, []);

  const localAppUser = localStorage.getItem("user");
  const appUserObject = JSON.parse(localAppUser);

  const handleSaveClick = (event) => {
    event.preventDefault();

    const sendToDb = {
      id: editedJournal.id,
      userId: appUserObject.id,
      title: editedJournal.title,
      content: editedJournal.content,
      gratitude: editedJournal.gratitude,
      intention: editedJournal.intention,
      categoryId: editedJournal.categoryId,
      isApproved: true, // Set IsApproved to a boolean value
    };

    editJournalEntry(sendToDb)
      .then(() => {
        // After editing, update the journal data and complete editing
        handleJournalEditRequest();
      })
  };

  return (
    <div className="modal-container">
    <Modal show={canEdit} onHide={handleCancelEditButtonClick}>
      <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <Form className="edit-journal-form">
          <h2 className="edit-journal-form-title">Edit Journal</h2>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editedJournal.title}
              onChange={(event) =>
                setEditedJournal({ ...editedJournal, title: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content:</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              required
              value={editedJournal.content}
              onChange={(event) =>
                setEditedJournal({ ...editedJournal, content: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gratitude:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editedJournal.gratitude}
              onChange={(event) =>
                setEditedJournal({ ...editedJournal, gratitude: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Intention:</Form.Label>
            <Form.Control
              type="text"
              required
              value={editedJournal.intention}
              onChange={(event) =>
                setEditedJournal({ ...editedJournal, intention: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              required
              value={editedJournal.categoryId}
              onChange={(event) =>
                setEditedJournal({ ...editedJournal, categoryId: parseInt(event.target.value) })
              }
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id || ""}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" className="save-edit-button" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="success" className="cancel-edit-button" onClick={handleCancelEditButtonClick}>
          X
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default EditJournal;





/*work with no modal*/

// import React, { useState, useEffect,useContext } from "react";
// import { Button, Form, Modal } from "react-bootstrap";
// import { editJournalEntry } from "../../Managers/JournalManager";
// import { CategoryContext } from "../../Managers/CategoryManager";
// import "./EditJournal.css"

// const EditJournal = ({ journal, handleJournalEditRequest, handleCancelEditButtonClick }) => {
//   const { getAllCategories, categories } = useContext(CategoryContext);
//   const [canEdit, setCanEdit] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [editedJournal, setEditedJournal] = useState({
//     id:journal.id,
//     title: journal.title,
//     content: journal.content,
//     gratitude: journal.gratitude,
//     intention: journal.intention,
//     categoryId: journal.categoryId,

//   });

//   useEffect(() => {
//     getAllCategories();

//      // Check if the current user is the creator of the journal
//      if (appUserObject && appUserObject.id === journal.userId) {
//       setCanEdit(true);
//     } else {
//       setShowAlert(true); // Show the alert if user doesn't have permission
//     }
//   }, []);



//   const localAppUser = localStorage.getItem("user");
//   const appUserObject = JSON.parse(localAppUser);

//   const handleSaveClick = (event) => {
//     event.preventDefault();

//     const sendToDb = {
//         id: editedJournal.id,
//         userId: appUserObject.id,
//         title: editedJournal.title,
//         content: editedJournal.content,
//         gratitude: editedJournal.gratitude,
//         intention: editedJournal.intention,
//         categoryId: editedJournal.categoryId,
//         isApproved: true // Set IsApproved to a boolean value
//       };
//     editJournalEntry(sendToDb).then(() => {
//       // After editing, update the journal data and complete editing
//       handleJournalEditRequest();
//     });
//   };

//   return (
//     <Form className="edit-journal-form">
//       {canEdit ? (
//       <>
//       <h2 className="edit-journal-form-title">Edit Journal</h2>
//       <Form.Group className="journal-form-group">
//         <Form.Label className="journal-form-label">Title:</Form.Label>
//         <Form.Control
//           type="text"
//           required
//           value={editedJournal.title}
//           onChange={(event) =>
//             setEditedJournal({ ...editedJournal, title: event.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group className="journal-form-group">
//         <Form.Label className="journal-form-label">Content:</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={8}
//           required
//           value={editedJournal.content}
//           onChange={(event) =>
//             setEditedJournal({ ...editedJournal, content: event.target.value })
//           }
//         />
//       </Form.Group>
//       <Form.Group className="journal-form-group">
//         <Form.Label className="journal-form-label">Gratitude:</Form.Label>
//         <Form.Control
//           type="text"
//           required
//           value={editedJournal.gratitude}
//           onChange={(event) =>
//             setEditedJournal({
//               ...editedJournal,
//               gratitude: event.target.value,
//             })
//           }
//         />
//       </Form.Group>
//       <Form.Group className="journal-form-group">
//         <Form.Label className="journal-form-label">Intention:</Form.Label>
//         <Form.Control
//           type="text"
//           required
//           value={editedJournal.intention}
//           onChange={(event) =>
//             setEditedJournal({
//               ...editedJournal,
//               intention: event.target.value,
//             })
//           }
//         />
//       </Form.Group>
//       <Form.Group className="journal-form-group">
//         <Form.Label className="journal-form-label">Category:</Form.Label>
//         <Form.Control
//           as="select"
//           required
//           value={editedJournal.categoryId}
//           onChange={(event) =>
//             setEditedJournal({
//               ...editedJournal,
//               categoryId: parseInt(event.target.value),
//             })
//           }
//         >
//           <option value="">-- Select Category --</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id || ""}>
//               {category.name}
//             </option>
//           ))}
//         </Form.Control>
//       </Form.Group>
//       <Button
//         variant="success"
//         className="save-journal-button"
//         onClick={handleSaveClick}
//       >
//         Save 
//       </Button>
//       <Button
//         variant="success"
//         className="cancel-edit-button"
//         onClick={handleCancelEditButtonClick}
//       >
//         Cancel
//       </Button> 
//       </>
//         ) : (
//           <Modal className="deniedModal" show={showAlert} onHide={() => setShowAlert(false)}>
//           <Modal.Header >
//             <Modal.Title>Permission Denied</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             You don't have permission to edit this journal.
//           </Modal.Body>
//           <Modal.Footer>
//             <Button className= "deniedCloseBtn"variant="secondary" onClick={() => setShowAlert(false)}>
//               X
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </Form>
//   );
// };

// export default EditJournal;
