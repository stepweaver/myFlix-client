import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../images/cthulhuLogo.png';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      variant='dark'
      expand='lg'
      className='navbar-custom'
    >
      <Container>
        <Row className='navbar-row'>
          <Col>
            <div className="d-flex justify-content-between w-100">
              <Navbar.Brand as={Link} to='/' className='brand'>
                <img src={logo} width='175' className='p-4'/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
            </div>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto fs-4 nav-links'>
                {!user && (
                  <>
                    <Nav.Link as={Link} to='/register'>
                      Register New User
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
          <Col>
            <h1 className='text-center cthulhuflix'>CthulhuFlix</h1>        
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};