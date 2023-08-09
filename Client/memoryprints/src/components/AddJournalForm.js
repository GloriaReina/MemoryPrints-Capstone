import { addJournalEntry } from "../Managers/JournalManager";
import { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { CategoryContext } from "../Managers/CategoryManager";
import { GetAllUsers } from "../Managers/UserManagers";
import { SaveSharedEntry } from "../Managers/JournalSharingManager";
import UserDropdown from "./Journal/UserDropdown";

export const AddJournalForm = ({ GetJournalsByUser }) => {
  const { getAllCategories, categories } = useContext(CategoryContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

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

  useEffect(() => {
    // Fetch all users
    GetAllUsers().then((userList) => {
      setAllUsers(userList); // Set the list of all users
    });
  }, []);

  console.log(allUsers) //yes im getting all users

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  //if true the user has a user role of 1 or 2, if false has a user role of 3(kid)
  const shouldShowDropdown =
    appUserObject &&
    (appUserObject.userRoleId == 1 || appUserObject.userRoleId == 2);

  const kidUsersList = allUsers.filter((user) => user.userRoleId == 3); // Filter kid users
  console.log(kidUsersList) //empty array


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
        isApproved: false,
        Comments: [],
      };

      // Perform fetch() to POST the object to the API
      addJournalEntry(journalToSendToAPI)
        .then((journal) => {
          // Update user view with newly added journal
          const userId = journal.userId
          GetJournalsByUser(userId);//why is it undefined? looks like i got a 201

          // If a user is selected for sharing, save shared entry details
          if (selectedUser) {
            const sharedEntry = {
              JournalId: journal.id, // Use the newly created journal's ID....its undefined
              ChildUserId: +selectedUser,
            };

            // Perform API call to save shared entry details to my bridge table
            SaveSharedEntry(sharedEntry);
          }
        })
        .then(() => {
          // Reset form fields
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
            {/* Use the UserDropdown component */}
            <UserDropdown
              // users={shouldShowDropdown ? allUsers : kidUsersList}
              selectedUser={selectedUser}
              handleUserSelect={handleUserSelect}
              shouldShowDropdown={shouldShowDropdown}
              kidUsersList= {kidUsersList}
              allUsers ={allUsers}
            />
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
              <Form.Label className="journal-form-label">Gratitude:</Form.Label>
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
