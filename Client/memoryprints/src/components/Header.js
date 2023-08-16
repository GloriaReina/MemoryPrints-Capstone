import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link} from 'react-router-dom';
import { NavLink } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import './Header.css';

export const Header = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    showButton();
  }, []);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <Navbar className="navbar" expand="lg" bg="navbar-background" variant="dark">
      <div className='navbar-container'>
        <Navbar.Brand as={Link} to="/" className='navbar-logo' onClick={closeMobileMenu}>
          <FontAwesomeIcon className='icon' icon={faFingerprint} />
          MemoryPrints
        </Navbar.Brand>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
  {isLoggedIn ? (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      <li className='nav-item'>
        <NavLink as={Link} to="/" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
          Home
        </NavLink>
      </li>
      {(localStorage.getItem("user") && (JSON.parse(localStorage.getItem("user")).userRoleId === 1 || (localStorage.getItem("user")).userRoleId === 2)) && (
        <>
          <li className='nav-item'>
            <NavLink as={Link} to="/alljournals" className='nav-links'bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
              All Entries
            </NavLink>
          </li>
        </>
      )}
      {(localStorage.getItem("user") && (JSON.parse(localStorage.getItem("user")).userRoleId === 1 && (
            <li className='nav-item'>
              <NavLink as={Link} to="/unapprovedjournals" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
                Unapproved Journals
              </NavLink>
            </li>
          )))}
      {(localStorage.getItem("user") && (JSON.parse(localStorage.getItem("user")).userRoleId === 3 && (
        <li className='nav-item'>
          <NavLink as={Link} to="/sharedjournals" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
            Shared Journals
          </NavLink>
        </li>
      )))}
      <li className='nav-item'>
        <NavLink as={Link} to="/myprofile" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
          Profile
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-links' bsPrefix="nav-link-custom" onClick={handleLogout}>
          Logout
        </NavLink>
      </li>
    </ul>
  ) : (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      <li className='nav-item'>
        <NavLink as={Link} to="/login" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
          Login
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink as={Link} to="/register" className='nav-links' bsPrefix="nav-link-custom" onClick={closeMobileMenu}>
          Register
        </NavLink>
      </li>
    </ul>
  )}
</Navbar.Collapse>
</div>
      </Navbar>
    </>
  );
};






// import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-bootstrap';
// import './Header.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFingerprint} from '@fortawesome/free-solid-svg-icons'

// export const Header = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('user');

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     navigate('/login', { replace: true });
//   };

//   return (
//     <Navbar className="navbar" expand="lg" bg="navbar-background" variant="dark">
//       <Navbar.Brand href="/" bsPrefix="navbar-brand-custom">
//       <FontAwesomeIcon icon={faFingerprint} />
//         MemoryPrints
//       </Navbar.Brand>
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ms-auto">
//           {isLoggedIn ? (
//             <>
//               <NavLink href="/homepage" bsPrefix="nav-link-custom">
//                 Home
//               </NavLink>
//                {/** Conditionally render the Unapproved Journals link based on user's role */}
//                {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).userRoleId == 1 && (
//                 <>
//                 <NavLink href="/alljournals" bsPrefix="nav-link-custom">
//                 All Entries
//               </NavLink>
//                 <NavLink href="/unapprovedjournals" bsPrefix="nav-link-custom">
//                   Unapproved Journals
//                 </NavLink>
//                 </>
//               )}
//                {/** Conditionally render the shared Journals link based on user's role */}
//                {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).userRoleId == 3 && (
//                 <NavLink href="/sharedjournals" bsPrefix="nav-link-custom">
//                   Shared Journals
//                 </NavLink>
//               )}
//               <NavLink href="/myprofile" bsPrefix="nav-link-custom">
//                 Profile
//               </NavLink>
//               <NavLink bsPrefix="nav-link-custom" onClick={handleLogout}>
//                 Logout
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <NavLink href="/" bsPrefix="nav-link-custom">
//                 Login
//               </NavLink>
//               <NavLink href="/register" bsPrefix="nav-link-custom">
//                 Register
//               </NavLink>
//             </>
//           )}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };