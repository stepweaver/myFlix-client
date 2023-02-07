import { useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import cthulhuLogo from '../../../images/cthulhuLogo.png';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const queryParams = `?username=${username}&password=${password}`;
      const response = await fetch(
        `https://cthulhuflix.onrender.com/users/login${queryparams}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { success, message, data } = await response.json();
      if (data) {
        locatlStorage.setItem('username', username);
        localStorage.setItem('token', data.token);
        onLoggedIn(username, data.token);
      } else if (success) {
        alert(message);
      } else {
        alert('Login failed');
      }
    }
    catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <>
      <Row className='d-flex justify-content-center align-content-center vh-100'>
        <Col sm={6} md={4} xs={3} xxl={2}>
          <Card className='p-4 rounded-4 shadow-lg m-3'>
            <Card.Img
              src={cthulhuLogo}
              alt='CthulhuFlix Logo'
              className='mx-auto mb-3 bg-primary'
            />
            <Card.Body className='d-flex flex-column align-items-center px-0'>
              <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group controlId='formUsername' className='mb-4'>
                  <Form.Control
                    type='text'
                    placeholder='Enter Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength='2'
                    required
                  />
                </Form.Group>
                <Form.Group conrolId='formPassword' className='mb4'>
                  <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  className='btn-primary d-block w-100 mb-3'
                  type='submit'
                >
                  Login
                </Button>
              </Form>
              <div>
                <p className='text-muted text-center'>
                  Don't have an account? Create one!
                  <Link to={'/register'} className='mx-2'>
                    Signup
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginView;
