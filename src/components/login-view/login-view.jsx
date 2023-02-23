import { useState } from 'react';
import { Button, Form, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch('https://cthulhuflix.onrender.com/login?' + new URLSearchParams(data).toString(), {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then ((response) => response.json())
    .then ((data) => {
      console.log('Login Response: ', data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert('Dave\'s not here! No such user.');
      }
    })
    .catch((e) => {
      alert('What did you do!? Something went wrong.');
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className='bg-transparent p-3 mt-5 border-primary fw-bold text-uppercase card-title'>
              <Card.Title className='text-center fs-4'>Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='loginUsername' className='input-group-sm mt-2'>
                <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter Username'
                    minLength='2'
                    required
                    style={{ border: 'none', borderBottom: '1px solid green', borderRadius: 0, boxShadow: 'none' }}
                  />
                </Form.Group>
                <Form.Group controlId='loginPassword' className='input-group-sm mt-2'>
                <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    required
                    style={{ border: 'none', borderBottom: '1px solid green', borderRadius: 0, boxShadow: 'none' }}
                  />
                </Form.Group>
                <Button
                  className='mt-3 text-uppercase w-100 fw-bold fs-5'
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};