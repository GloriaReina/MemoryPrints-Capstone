import { addJournalEntry } from "../Managers/JournalManager";
import { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { CategoryContext } from "../Managers/CategoryManager";

export const AddJournalForm = ({ GetJournalsByUser }) => {
  const { getAllCategories, categories } = useContext(CategoryContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [show, setShow] = useState(false);

  const [journal, update] = useState({
    userId: "",
    title: "",
    content: "",
    gratitude: "",
    intention: "",
    categoryId: "",
  });

  const localAppUser = localStorage.getItem("user");
  const appUserObject = JSON.parse(localAppUser);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // define validation function
  const validateForm = () => {
    if (
      (journal.title && journal.content && journal.gratitude,
      journal.intention && journal.categoryId)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      alert("Please fill in all required fields.");
    }
  };

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

   
    validateForm();
    if (isFormValid) {
      // TODO: Create the object to be saved to the API
      const journalToSendToAPI = {
        UserId: appUserObject.id,
        Title: journal.title,
        Content: journal.content,
        Gratitude: journal.gratitude,
        Intention: journal.intention,
        CategoryId: journal.categoryId,
        Comments: []
      };

      // Perform fetch() to POST the object to the API
      addJournalEntry(journalToSendToAPI)
        .then((journal) => {
          /*update user view with newly added journal */
          GetJournalsByUser(journal.UserId);
        })
        .then(() => {
          /* update function resets form fields to default values so user can submit another journal without having to manually clear the form */
          update({
            userId: "",
            title: "",
            content: "",
            gratitude: "",
            intention: "",
            categoryId: "",
          });
        })
        .then(() => {
          handleClose();
        });
    }
  };
  return (
    <>
      <div className="add-new-journal-button d-grid mt-5">
        <Button
          className="new-journal "
          variant="outline-warning"
          size="sm"
          onClick={handleShow}
        >
          <strong> + New Entry </strong>
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="category">
              <Form.Label column sm={2}>
                Select a Category:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={journal.categoryId}
                  required
                  onChange={(evt) => {
                    const copy = { ...journal };
                    copy.categoryId = parseInt(evt.target.value);
                    /*reset fields to default setting*/
                    update(copy);
                  }}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id || ""}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="title">
              <Form.Label column sm={2}>
                Title:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter journal title"
                  value={journal.title}
                  required
                  onChange={(evt) => {
                    const copy = { ...journal };
                    copy.title = evt.target.value;
                    update(copy);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className="journal-form-group">
              <Form.Label className="journal-form-label">Content:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write Away!"
                value={journal.content}
                required
                onChange={(evt) => {
                  const copy = { ...journal };
                  copy.content = evt.target.value;
                  update(copy);
                }}
              />
            </Form.Group>
            <Form.Group className="journal-form-group">
              <Form.Label className="journal-form-label">
                Gratitude:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="I'm grateful for..."
                value={journal.gratitude}
                required
                onChange={(evt) => {
                  const copy = { ...journal };
                  copy.gratitude = evt.target.value;
                  update(copy);
                }}
              />
            </Form.Group>
            <Form.Group className="journal-form-group">
              <Form.Label className="journal-form-label">Intention:</Form.Label>
              <Form.Control
                type="text"
                placeholder="How I will make today/tomorrow great ... "
                value={journal.intention}
                onChange={(evt) => {
                  const copy = { ...journal };
                  copy.intention = evt.target.value;
                  update(copy);
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="success"
              bsPrefix="submit-journal-button"
              onClick={(clickEvent) => {
                handleSubmitButtonClick(clickEvent);
              }}
            >
              Submit Entry
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
