import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const UserDropdown = ({ kidUsersList,allUsers, selectedUser, handleUserSelect, shouldShowDropdown }) => {

    return (
    <Form.Group as={Row} controlId="shareWithUser">
      <Form.Label column sm={2}>
        Share With User:
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          as="select"
          value={selectedUser || ""}
          onChange={handleUserSelect}
        >
          <option value="">-- Select User --</option>
          {shouldShowDropdown
            ? allUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName}
                </option>
              ))
              : kidUsersList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName}
                </option>
              ))}
        </Form.Control>
      </Col>
    </Form.Group>
  );
};

export default UserDropdown;
