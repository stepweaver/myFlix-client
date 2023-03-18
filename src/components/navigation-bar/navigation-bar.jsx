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
        <div className='col-sm'>
          <Navbar.Brand as={Link} to='/' className='brand'>
            <img src={logo} width='120' className='mt-4' />
          </Navbar.Brand>
        </div>
        <div className='col-sm'>
          <h1 className='text-center cthulhuflix'>CthulhuFlix</h1>       
        </div>
        <div className='col-sm me-auto'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='fs-5 nav-links'>
              {!user && (
                <>
                  <Nav.Link className='me-auto' as={Link} to='/register'>
                    Register
                  </Nav.Link>
                  <Nav.Link className='me-auto' as={Link} to='/'>
                    Login
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  <Nav.Link as={Link} to={'/'}>
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
        </div>
      </Container>
    </Navbar>
  );
};