import React, { useState, useEffect,useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { editJournalEntry } from "../../Managers/JournalManager";
import { CategoryContext } from "../../Managers/CategoryManager";


const EditJournal = ({ journal, handleJournalEditRequest, handleCancelEditButtonClick }) => {
  const { getAllCategories, categories } = useContext(CategoryContext);

  const [editedJournal, setEditedJournal] = useState({
    id:journal.id,
    title: journal.title,
    content: journal.content,
    gratitude: journal.gratitude,
    intention: journal.intention,
    categoryId: journal.categoryId,

  });

  useEffect(() => {
    getAllCategories();
  }, []);

  const localAppUser = localStorage.getItem("user");
  const appUserObject = JSON.parse(localAppUser);

  const handleSaveClick = (event) => {
    event.preventDefault();
    // const sendToDb = {...editedJournal}
    // sendToDb.userId = appUserObject.id
    // sendToDb.IsApproved = 1

    const sendToDb = {
        id: editedJournal.id,
        userId: appUserObject.id,
        title: editedJournal.title,
        content: editedJournal.content,
        gratitude: editedJournal.gratitude,
        intention: editedJournal.intention,
        categoryId: editedJournal.categoryId,
        isApproved: true // Set IsApproved to a boolean value
      };
    editJournalEntry(sendToDb).then(() => {
      // After editing, update the journal data and complete editing
      handleJournalEditRequest();
    });
  };

  return (
    <Form className="edit-journal-form">
      <h2 className="edit-journal-form-title">Edit Journal</h2>
      <Form.Group className="journal-form-group">
        <Form.Label className="journal-form-label">Title:</Form.Label>
        <Form.Control
          type="text"
          required
          value={editedJournal.title}
          onChange={(event) =>
            setEditedJournal({ ...editedJournal, title: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="journal-form-group">
        <Form.Label className="journal-form-label">Content:</Form.Label>
        <Form.Control
          as="textarea"
          required
          value={editedJournal.content}
          onChange={(event) =>
            setEditedJournal({ ...editedJournal, content: event.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="journal-form-group">
        <Form.Label className="journal-form-label">Gratitude:</Form.Label>
        <Form.Control
          type="text"
          required
          value={editedJournal.gratitude}
          onChange={(event) =>
            setEditedJournal({
              ...editedJournal,
              gratitude: event.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="journal-form-group">
        <Form.Label className="journal-form-label">Intention:</Form.Label>
        <Form.Control
          type="text"
          required
          value={editedJournal.intention}
          onChange={(event) =>
            setEditedJournal({
              ...editedJournal,
              intention: event.target.value,
            })
          }
        />
      </Form.Group>
      <Form.Group className="journal-form-group">
        <Form.Label className="journal-form-label">Category:</Form.Label>
        <Form.Control
          as="select"
          required
          value={editedJournal.categoryId}
          onChange={(event) =>
            setEditedJournal({
              ...editedJournal,
              categoryId: parseInt(event.target.value),
            })
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
      <Button
        variant="success"
        className="save-journal-button"
        onClick={handleSaveClick}
      >
        Save 
      </Button>
      <Button
        variant="success"
        className="cancel-edit-button"
        onClick={handleCancelEditButtonClick}
      >
        Cancel
      </Button> 
    </Form>
  );
};

export default EditJournal;
