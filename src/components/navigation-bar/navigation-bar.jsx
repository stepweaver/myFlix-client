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
            <img src={logo} width='175' className='p-4'/>
          </Navbar.Brand>
        </div>
        <div className='col-sm'>
          <h1 className='text-center cthulhuflix'>CthulhuFlix</h1>       
        </div>
        <div className='col-sm'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='text-center w-100 mb-3' id='basic-navbar-nav'>
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
        </div>
      </Container>
    </Navbar>
  );
};