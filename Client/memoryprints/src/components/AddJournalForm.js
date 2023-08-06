import { addJournalEntry } from "../Managers/JournalManager";
import { useState, useEffect, useContext } from "react";
import {Button,Form,Row,Col, Modal} from "react-bootstrap";


export const AddJournalForm = ({GetJournalsByUser}) => {

 
  const [isFormValid, setIsFormValid] = useState(false);

  const [show, setShow] = useState(false);

  const [journal, update] = useState({
    userId: "",
    title: "",
    content: "",
    gratitude: "",
    intention: "",
    categoryId: ""
  });

  const localAppUser = localStorage.getItem("user");
  const appUserObject = JSON.parse(localAppUser);

  
  useEffect(() => {
    GetAllCategories()
}, [])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


   // define validation function
   const validateForm = () => {
    if (
      journal.title &&
      journal.content &&
      journal.gratitude,
      journal.intention &&
      journal.categoryId 
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      alert("Please fill in all required fields.");
    }
  };

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();

    // if (journal.categoryId === "") {
    //     alert("Please select a category");
    //     return;
    // }
    validateForm();
    if (isFormValid) {
    // TODO: Create the object to be saved to the API
    const journalToSendToAPI = {
      UserId: appUserObject.id,
      Title: journal.title,
      Content: journal.content,
      Gratitude: journal.gratitude,
      Intention: journal.intention,
      CategoryId: journal.categoryId
    };

    // Perform fetch() to POST the object to the API
    addJournalEntry(journalToSendToAPI)
      .then((journal) => {
        /*update page with current list of journals */
        GetJournalsByUser(journal.Id);
      })
      .then(() => {
        /* update function resets form fields to default values so user can submit another journal without having to manually clear the form */
        update({
            userId: "",
            title: "",
            content: "",
            gratitude: "",
            intention: "",
            categoryId: ""
        });
      })
      .then(() => {
       handleClose ();
      });
    }
  };
  return (
    <>
    <div className="add-new-journal-button d-grid mt-5">
              <Button className="new-journal "
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
            <Form.Label column sm={2} >
              Select a Category:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={journal.category}
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
                <option key={category.id} value={category.id}>
                     {category.name}
                </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="category">
            <Form.Label column sm={2} >
              Category:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                value={journal.category}
                required
                onChange={(evt) => {
                  const copy = { ...journal };
                  copy.category = evt.target.value;
                  update(copy);
                }}
              >
                <option value="">-- Select Category --</option>
                <option value="1">Self care</option>
                <option value="2">Family life</option>
                <option value="3">Work life</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group className="journal-form-group">
            <Form.Label className="journal-form-label" >Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter journal description"
              value={journal.description}
              required
              onChange={(evt) => {
                const copy = { ...journal };
                copy.description = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="journal-form-group">
            <Form.Label className="journal-form-label" >Deadline:</Form.Label>
            <Form.Control 
              type="date"
              placeholder="Enter Due Date"
              value={journal.deadline}
              required
              onChange={(evt) => {
                const copy = { ...journal };
                copy.deadline = evt.target.value;
                update(copy);
              }}
              
            />
          </Form.Group>
          <Form.Group className="journal-form-group">
            <Form.Label className="journal-form-label" >Estimated Time(min):</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Length of time needed (min) "
              value={journal.estimatedTime}
              required
              onChange={(evt) => {
                const copy = { ...journal };
                copy.estimatedTime = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="journal-form-group">
            <Form.Label className="journal-form-label">
              Completion Time(min):
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Length of time used (min) "
              value={journal.actualTime}
              onChange={(evt) => {
                const copy = { ...journal };
                copy.actualTime = evt.target.value;
                update(copy);
              }}
            />
          </Form.Group>
          <Form.Group className="journal-form-group">
  <Form.Label className="journal-form-label">Start Time:</Form.Label>
  <Form.Control
    type="time"
    value={journal.startTime}
    onChange={(evt) => {
      const copy = { ...journal };
      copy.startTime = evt.target.value;
      update(copy);
    }}
  />
</Form.Group>
<Form.Group className="journal-form-group">
  <Form.Label className="journal-form-label">End Time:</Form.Label>
  <Form.Control
    type="time"
    value={journal.endTime}
    onChange={(evt) => {
      const copy = { ...journal };
      copy.endTime = evt.target.value;
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
            Submit journal
          </Button>
          </Form>
          </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
  
 
};