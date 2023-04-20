import { Navbar, Container, Nav, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../../../images/cthulhuLogo.png';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      collapseOnSelect
      variant='dark'
      expand='lg'
    >
      <Container fluid>
        <Navbar.Brand as={Link} to='/' className='brand'>
          <img src={logo} alt='brand logo' width='70' />
        </Navbar.Brand>
        <h1 className='text-center cthulhuflix mt-4'>CthulhuFlix</h1>       
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto p-4 mt-4 nav-links'>
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
          <Form className='d-flex'>
            <Form.Control type='Search' placeholder='Search Movies...' className='search-box me-2' aria-label='Search' />
            <Button variant='outline-success' className='search-button'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};