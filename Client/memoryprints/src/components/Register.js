import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, FormLabel, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserManagers";
import { GetUserRoles } from "../Managers/UserRoleManager";
import { GetListOfKidUsers } from "../Managers/UserManagers";
import { addUserProfileLinks } from "../Managers/UserToKidUserLinksManager";

export default function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [relationship, setRelationship] = useState("");
  const [userRolesList, setUserRolesList] = useState([]);
  const [childUserId, setChildUserId] = useState("");
  const [childUsersList, setChildUsersList] = useState([]);


  useEffect(() => {
    // Fetch the list of user roles from the API
    GetUserRoles().then((roles) => {
      setUserRolesList(roles);
    });
  }, [userRolesList]);

  useEffect(() => {
    // Fetch the list of kid users from the API
    GetListOfKidUsers().then((kidUsers) => {
      setChildUsersList(kidUsers);
    });
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    /*checks if password is not an empty string (password && ...) and also checks if the entered password (password) is not equal to the confirmed password (confirmPassword).Condition only true when the user has entered a password and the entered password doesn't match the confirmed password.*/
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const user = {
        firstName,
        lastName,
        displayName,
        imageLocation,
        email,
        userRole,
        relationship,
      };
      register(user, password).then((response) => {
        const userId = response.Id;
        console.log(userId)
       
        // Once the main user is registered, create a link with the selected childUserId
        if (childUserId) {
          console.log(childUserId)//do i get the right type and an id? yes!

          const linkData = {
            UserId: userId,
            UserId: childUserId
          };
          addUserProfileLinks(linkData).then(() => {
            setIsLoggedIn(true);
            navigate("/");
          });
        } else {
          setIsLoggedIn(true);
          navigate("/");
        }
      });
    }
  };

  return (
    <Form onSubmit={registerClick}>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Display Name
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="displayName"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Profile Image URL
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="imageLocation"
            type="text"
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          First Name
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Last Name
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
      </FormGroup>
      {/* User Role Dropdown */}
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Role
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="userRole"
            as="select"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="" disabled>
              Select Role
            </option>
            {userRolesList.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Relationship
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="relationship"
            type="text"
            onChange={(e) => setRelationship(e.target.value)}
          />
        </Col>
      </FormGroup>
      {/* Link account to Kid User Dropdown */}
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Link Account to Kid User
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="childUserId"
            as="select"
            value={childUserId}
            onChange={(e) => setChildUserId(e.target.value)}
          >
            <option value="" disabled>
              Select Kid User
            </option>
            {childUsersList.map((kidUser) => (
              <option key={kidUser.id} value={kidUser.id}>
                {kidUser.firstName}
              </option>
            ))}
          </FormControl>
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Email
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Password
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3" >
        <FormLabel column sm="2">
          Confirm Password
        </FormLabel>
        <Col sm="10">
          <FormControl
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Col>
      </FormGroup>
      <FormGroup>
        <Button type="submit">Register</Button>
      </FormGroup>
    </Form>
  );
};



//   return (
//     <Form onSubmit={registerClick}>
//       <FormGroup>
//         <FormLabel htmlFor="displayName">Display Name</FormLabel>
//         <FormControl
//           id="displayName"
//           type="text"
//           onChange={(e) => setDisplayName(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="imageLocation">Profile Image URL</FormLabel>
//         <FormControl
//           id="imageLocation"
//           type="text"
//           onChange={(e) => setImageLocation(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="firstName">First Name</FormLabel>
//         <FormControl
//           id="firstName"
//           type="text"
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="lastName">Last Name</FormLabel>
//         <FormControl
//           id="lastName"
//           type="text"
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </FormGroup>
//       {/* User Role Dropdown */}
//       <FormGroup>
//         <FormLabel htmlFor="userRole">Role</FormLabel>
//         <FormControl
//           id="userRole"
//           as="select"
//           value={userRole}
//           onChange={(e) => setUserRole(e.target.value)}
//         >
//           <option value="" disabled>
//             Select Role
//           </option>
//           {userRolesList.map((role) => (
//             <option key={role.id} value={role.id}>
//               {role.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="relationship">Relationship</FormLabel>
//         <FormControl
//           id="relationship"
//           type="text"
//           onChange={(e) => setRelationship(e.target.value)}
//         />
//       </FormGroup>
//       {/* Link account to Kid User Dropdown */}
//       <FormGroup>
//         <FormLabel htmlFor="childUserId">Link Account to Kid User</FormLabel>
//         <FormControl
//           id="childUserId"
//           as="select"
//           value={childUserId}
//           onChange={(e) => setChildUserId(e.target.value)}
//         >
//           <option value="" disabled>
//             Select Kid User
//           </option>
//           {childUsersList.map((kidUser) => (
//             <option key={kidUser.id} value={kidUser.id}>
//               {kidUser.name}
//             </option>
//           ))}
//         </FormControl>
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="email">Email</FormLabel>
//         <FormControl
//           id="email"
//           type="text"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="password">Password</FormLabel>
//         <FormControl
//           id="password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//         <FormControl
//           id="confirmPassword"
//           type="password"
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//       </FormGroup>
//       <FormGroup>
//         <Button type="submit">Register</Button>
//       </FormGroup>
//     </Form>
//   );
// };

