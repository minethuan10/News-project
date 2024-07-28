import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { auth } from './firebase';
import "../bootstrap.min.css";

export function NavBar({ darkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout error, if necessary
    }
  };

  return (
    <Navbar className={`navbar ${darkMode ? 'navbar-dark' : 'navbar-light'}`} expand="lg">
      <Container fluid className="d-flex align-items-center justify-content-between">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img 
              src='https://img.icons8.com/?size=100&id=44030&format=png&color=000000'
              alt="News Home Icon" 
              width="60" 
              height="54" 
              style={{ cursor: 'pointer' }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <h1 className={`navbar-header ${darkMode ? 'text-white' : 'text-dark'}`} style={{ fontSize: '1.5rem' }}>
          NewsForYou
        </h1>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {!isLoggedIn ? (
              <>
                {location.pathname !== '/login' && (
                  <LinkContainer to="/login">
                    <Nav.Link className={`d-flex align-items-center ${darkMode ? 'text-white' : 'text-dark'}`}>
                      <img 
                        src="https://img.icons8.com/?size=100&id=48303&format=png&color=000000" 
                        alt="Login" 
                        width="50" 
                        height="50"
                        title="Login"
                        style={{ cursor: 'pointer' }}
                      />
                    </Nav.Link>
                  </LinkContainer>
                )}
                {location.pathname !== '/register' && (
                  <LinkContainer to="/register">
                    <Nav.Link className={`d-flex align-items-center ${darkMode ? 'text-white' : 'text-dark'}`}>
                      <img 
                        src="https://img.icons8.com/?size=100&id=zUTztu-cLYTs&format=png&color=000000" 
                        alt="Register" 
                        width="50" 
                        height="50"
                        title="Register"
                        style={{ cursor: 'pointer' }}
                      />
                    </Nav.Link>
                  </LinkContainer>
                )}
              </>
            ) : (
              <>
                {location.pathname !== '/profile' && (
                  <LinkContainer to="/profile">
                    <Nav.Link className={`d-flex align-items-center ${darkMode ? 'text-white' : 'text-dark'}`}>
                      <img 
                        src="https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000" 
                        alt="Profile" 
                        width="50" 
                        height="50"
                        title="Your Profile"
                        style={{ cursor: 'pointer' }}
                      />
                    </Nav.Link>
                  </LinkContainer>
                )}
                <LinkContainer to="/" onClick={handleLogout}>
                  <Nav.Link className={`d-flex align-items-center ${darkMode ? 'text-white' : 'text-dark'}`}>
                    <img 
                      src="https://img.icons8.com/?size=100&id=44001&format=png&color=000000" 
                      alt="Logout" 
                      width="50" 
                      height="50" 
                      title="Logout"
                      style={{ cursor: 'pointer' }}
                    />
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
