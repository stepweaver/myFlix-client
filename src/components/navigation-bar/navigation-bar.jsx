import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../images/cthulhuLogo.png';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      variant='dark'
      expand='lg'
    >
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img src={logo} width='175' className='p-4'/>
          CthulhuFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {!user && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};