// export const MyJournalEntries = () => {
//     const [journals, setJournals] = useState([]);
  
//     const localAppUser = localStorage.getItem("user");
//     const AppUserObject = JSON.parse(localAppUser);
//     const userId = AppUserObject.id;
//   console.log(typeof(userId))//receiving appropriate id and type
  
//     useEffect(() => {
//       GetJournalsByUser(userId).then((allJournals) => setJournals(allJournals)
//       );
//       console.log(journals)
//     }, []);
  
  
  
//     return (
//       <Container className="journal-container">
//         <Row className="journal-list" mt-3>
//           {journals.map((journal) => (
//             <Col key={journal.id} xs={8}>
//               <Card className="journal-card" style={{ width: '18rem' }}>
//                 {/* sent journal as props to Journal */}
//                 <Journal journalProp={journal} />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     );
//   };
  


// import { Button, Form, FormGroup, Label, Input } from "reactstrap";


//   return (
//     <Form onSubmit={registerClick}>
//       <fieldset>
//         <FormGroup>
//           <Label htmlFor="displayName">Display Name</Label>
//           <Input
//             id="displayName"
//             type="text"
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="imageLocation">Profile Image URL</Label>
//           <Input
//             id="imageLocation"
//             type="text"
//             onChange={(e) => setImageLocation(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             type="text"
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             type="text"
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </FormGroup>
//         {/* User Role Dropdown */}
//         <FormGroup>
//           <Label htmlFor="userRole">Role</Label>
//           <Input
//             id="userRole"
//             type="select"
//             value={userRole}
//             onChange={(e) => setUserRole(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             {userRolesList.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="relationship">Relationship</Label>
//           <Input
//             id="relationship"
//             type="text"
//             onChange={(e) => setRelationship(e.target.value)}
//           />
//         </FormGroup>
//         {/* Link account to Kid User Dropdown */}
//         <FormGroup>
//           <Label htmlFor="childUserId">Link Account to Kid User</Label>
//           <Input
//             id="childUserId"
//             type="select"
//             value={childUserId}
//             onChange={(e) => setChildUserId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Kid User
//             </option>
//             {childUsersList.map((kidUser) => (
//               <option key={kidUser.id} value={kidUser.id}>
//                 {kidUser.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label for="email">Email</Label>
//           <Input
//             id="email"
//             type="text"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="confirmPassword">Confirm Password</Label>
//           <Input
//             id="confirmPassword"
//             type="password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Button>Register</Button>
//         </FormGroup>
//       </fieldset>
//     </Form>
//   );
// }


// register(user, password)
// .then((response) => response.json())
// .then((data) => {
//     const userId = data.Id; // Assuming the response is a JSON object with the "Id" property
//    console.log(userId);  


// export const register = (userObject, password) => {
//     return fetch(`${baseUrl}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userObject),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }
//       return response.json();
//     })
//     .then((savedUser) => {
//       // Save the user to local storage
//       localStorage.setItem("user", JSON.stringify(savedUser));
//       return savedUser; // Return the savedUser for further processing if needed
//     });
//   };


/*---------------------------- Prev Header code ----------------------------------------*/


// import React, { useState } from 'react';
// import { NavLink as RRNavLink } from "react-router-dom";
// import { logout } from '../Managers/UserManagers';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// export default function Header({ isLoggedIn, setIsLoggedIn }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar bg="light" expand="md">
//         <Navbar.Brand as={RRNavLink} to="/">MemoryPrints</Navbar.Brand>
//         <Navbar.Toggle onClick={toggle} />
//         <Navbar.Collapse isOpen={isOpen}>
//           <Nav className="mr-auto">
//             {isLoggedIn && (
//               <>
//                 <Nav.Link as={RRNavLink} to="/">Homepage</Nav.Link>
//                 <Nav.Link as={RRNavLink} to="/journalentries">All Entries</Nav.Link>
//               </>
//             )}
//           </Nav>
//           <Nav>
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link as={RRNavLink} to="/userProfile">My Profile</Nav.Link>
//                 <Nav.Link
//                   aria-current="page"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     logout()
//                     setIsLoggedIn(false)
//                   }}
//                 >
//                   Logout
//                 </Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={RRNavLink} to="/login">Login</Nav.Link>
//                 <Nav.Link as={RRNavLink} to="/register">Register</Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </div>
//   );
// }





// import React, { useState } from 'react';
// import { NavLink as RRNavLink } from "react-router-dom";
// import { logout } from '../Managers/UserManagers';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink
// } from 'reactstrap';

// export default function Header({isLoggedIn, setIsLoggedIn}) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand tag={RRNavLink} to="/">MemoryPrints</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             { /* When isLoggedIn === true, we will render the Home link */ }
//             {isLoggedIn &&
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/">Homepage</NavLink>
                
//               </NavItem>
//             }
//           </Nav>
//           <Nav className="mr-auto" navbar>
//             { /* When isLoggedIn === true, we will render the all entries link */ }
//             {isLoggedIn &&
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/journalentries">All Entries</NavLink>
//               </NavItem>
//             }
//           </Nav>
//           <Nav navbar>
//             {isLoggedIn &&
//               <>
//               <NavItem>
//                 <NavLink tag={RRNavLink} to="/userProfile">My Profile</NavLink>
//               </NavItem>
//                 <NavItem>
//                   <a aria-current="page" className="nav-link"
//                     style={{ cursor: "pointer" }} onClick={() => {
//                       logout()
//                       setIsLoggedIn(false)
//                     }}>Logout</a>
//                 </NavItem>
                
//               </>
//             }
//             {!isLoggedIn &&
//               <>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/login">Login</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink tag={RRNavLink} to="/register">Register</NavLink>
//                 </NavItem>
//               </>
//             }
//           </Nav>
          
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
// import './Header.css';

// export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   return (
//     <Navbar className='navbar' expand="lg" bg="navbar-background" variant="dark">
//       <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">MemoryPrints</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         {isLoggedIn ? (
//           <Nav className="ms-auto">
//             <NavLink href="/" bsPrefix="nav-link-custom">HomePage</NavLink>
//             <NavLink href="/journalentries" bsPrefix="nav-link-custom">All Entries</NavLink>
//             <NavLink href="/myprofile" bsPrefix="nav-link-custom">My Profile</NavLink>
            
//             {/* Uncomment the following line when the 'Profile' link is available */}
//             {/* <NavLink href="/profile" bsPrefix="nav-link-custom">Profile</NavLink> */}
            
//             <NavLink
//               bsPrefix="nav-link-custom"
//               onClick={() => {
//                 // localStorage.removeItem("user");
//                 setIsLoggedIn(false)
//                 // navigate("/login", { replace: true });
//               }}
//             >
//               Logout
//             </NavLink>
//           </Nav>
//         ) : (
//           <Nav className="ms-auto">
//             <NavLink href="/login" bsPrefix="nav-link-custom">Login</NavLink>
//             <NavLink href="/register" bsPrefix="nav-link-custom">Register</NavLink>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };