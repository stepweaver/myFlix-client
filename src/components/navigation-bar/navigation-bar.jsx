import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '../../../images/cthulhuLogo.png';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <Navbar collapseOnSelect variant='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/' onClick={() => setQuery('')}>
          <h1 className='text-center cthulhuflix mt-4 fs-1'>
            <img src={logo} alt='brand logo' width='70' /> CthulhuFlix
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto p-3 mt-3 nav-links'>
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
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form className='d-flex'>
              <Form.Control
                type='Search'
                placeholder='Search Movies...'
                className='search-box me-2'
                aria-label='Search'
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};