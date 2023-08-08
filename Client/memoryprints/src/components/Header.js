import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import './Header.css';

// export const Header = () => {
//     const navigate = useNavigate();
//     const isLoggedIn = localStorage.getItem("user");

//     return (
//       <Navbar className='navbar' expand="lg" bg="navbar-background" variant="dark">
//       <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">MemoryPrints</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ms-auto">
//           <NavLink href="/" bsPrefix="nav-link-custom">HomePage</NavLink>
//           <NavLink href="/journalentries" bsPrefix="nav-link-custom">All Entries</NavLink>
//           <NavLink href="/myprofile" bsPrefix="nav-link-custom">My Profile</NavLink>
          
//           {/* Uncomment the following line when the 'Profile' link is available */}
//           {/* <NavLink href="/profile" bsPrefix="nav-link-custom">Profile</NavLink> */}
          
//           {isLoggedIn ? (
//             <NavLink
//               bsPrefix="nav-link-custom"
//               onClick={() => {
//                 localStorage.removeItem("user");
//                 navigate("/login", { replace: true });
//               }}
//             >
//               Logout
//             </NavLink>
//           ) : (
//             <>
//               <NavLink href="/login" bsPrefix="nav-link-custom">Login</NavLink>
//               <NavLink href="/register" bsPrefix="nav-link-custom">Register</NavLink>
//             </>  
//           )}
//         </Nav>
//       </Navbar.Collapse>
//         </Navbar>
//     );
// };

export const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <Navbar className="navbar" expand="lg" bg="navbar-background" variant="dark">
      <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">
        MemoryPrints
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isLoggedIn ? (
            <>
              <NavLink href="/homepage" bsPrefix="nav-link-custom">
                HomePage
              </NavLink>
              <NavLink href="/journalentries" bsPrefix="nav-link-custom">
                All Entries
              </NavLink>
              <NavLink href="/unapprovedjournals" bsPrefix="nav-link-custom">
                Unapproved Journals
              </NavLink>
              <NavLink href="/myprofile" bsPrefix="nav-link-custom">
                My Profile
              </NavLink>
              <NavLink bsPrefix="nav-link-custom" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink href="/login" bsPrefix="nav-link-custom">
                Login
              </NavLink>
              <NavLink href="/register" bsPrefix="nav-link-custom">
                Register
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};