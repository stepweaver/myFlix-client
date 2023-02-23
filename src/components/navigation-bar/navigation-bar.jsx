import { useState } from 'react';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../images/cthulhuLogo.png';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  }

  return (
    <Navbar variant='dark' className='navbar-custom' expanded={expanded}>
      <Container fluid>
        <Row className='navbar-row'>
          <Col>
            <div className='d-flex justify-content-between align-items-center w-100'>
              <Navbar.Brand as={Link} to='/' className='brand'>
                <img src={logo} width='175' className='p-4' alt='CthulhuFlix logo' />
              </Navbar.Brand>
              <Navbar.Toggle onClick={handleToggle} aria-controls='basic-navbar-nav' />
            </div>
          </Col>
          <Col className='text-center'>
            <h1 className='cthulhuflix'>CthulhuFlix</h1>       
          </Col>
          <Col>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='fs-5 nav-links'>
                {!user && (
                  <>
                    <Nav.Link as={Link} to='/register'>
                      Register
                    </Nav.Link>
                    <Nav.Link as={Link} to='/'>
                      Login
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to={'/'} className='fs-4'>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={`/users/${user.username}`} className='fs-4'>
                      Profile
                    </Nav.Link>
                    <Nav.Link onClick={onLoggedOut} className='fs-4'>
                      Logout
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};