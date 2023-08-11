import React, { useState, useEffect } from "react";
import { GetUserById, EditProfile } from "../Managers/UserManagers";
import { Button, Modal, Form } from "react-bootstrap"; // Import Bootstrap components
import "./MyProfile.css";


export const MyProfile = () => {
  const [userProfile, setUserProfile] = useState({
    imageLocation: "",
    displayName: "",
    firstName: "",
    lastName: "",
    relationShip: "",
    createDateTime: "",
    email:"",
    password:""
  });

  const localAppUser = localStorage.getItem("user");
  const AppUserObject = JSON.parse(localAppUser);
  const userId = AppUserObject.id;

  useEffect(() => {
    GetUserById(userId)
      .then((userProfile) => setUserProfile(userProfile))
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [userId]);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleSaveClick = () => {
    EditProfile(userProfile)
      .then(() => {
        GetUserById(userId)
          .then((updatedProfile) => {
            setUserProfile(updatedProfile);
            setShowEditModal(false);
          })
          .catch((error) => {
            console.error("Error fetching updated user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error editing user profile:", error);
      });
  };

  return (
    <div className="profileInfo">
      <h1>My Profile</h1>
      <div>
        <strong>{userProfile.displayName}</strong>
      </div>
      <div>
        <img src={userProfile.imageLocation} alt="User Profile" />
      </div>
      <div>
        <strong>First Name:</strong> {userProfile.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {userProfile.lastName}
      </div>
      <div>
        <strong>Relationship:</strong> {userProfile.relationShip}
      </div>
      <div>
        <strong>Email:</strong> {userProfile.email}
      </div>
      <div>
        <strong>password:</strong> {userProfile.password}
      </div>
      

     
      <Button className="modalBtn" variant="primary" onClick={() => setShowEditModal(true)}>
        Edit Profile
      </Button>
<div className="modalFormContainer" >
      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}  centered
        dialogClassName="edit-profile-modal" >
        <Modal.Body>
          <Form>
            {/* form fields for editing */}
            <Form.Group>
              <Form.Label className="label">Display Name:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.displayName}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, displayName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">First Name:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.firstName}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Last Name:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.lastName}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Image Location:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.imageLocation}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    imageLocation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Relationship:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.relationShip}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, relationShip: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Email:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Password:</Form.Label>
              <Form.Control className="inputField"
                type="text"
                value={userProfile.password}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="closeBtn" variant="secondary" onClick={() => setShowEditModal(false)}>
            X
          </Button>
          <div className="saveButtonPosition">
          <Button className="saveBtn" variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};


