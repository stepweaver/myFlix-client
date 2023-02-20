import { useState } from 'react';
import { Form, Button, Container, Card, CardGroup, Row, Col } from 'react-bootstrap';

import './signup-view.scss';

export const SignupView = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birth: birthday
    };

    fetch('https://cthulhuflix.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }).then ((response) => {
      if (response.ok) {
        alert('Great success! Click "Ok" to return to the login page.');
        window.location.href = './login';
      } else if (response.status === 400 || response.status === 422) {
        alert(`Username "${username}" is taken`);
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className='bg-transparent p-3 mt-5 border-primary'>
              <Card.Title className='text-center fs-4 fw-bold'>New User Registration</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='signupUsername' className='input-group-sm mt-2'>
                <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='2'
                    placeholder='Enter Username'
                  />
                </Form.Group>
                <Form.Group controlId='signupPassword' className='input-group-sm mt-2'>
                  <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength='6'
                      placeholder='Enter Password'
                    />
                  </Form.Group>
                  <Form.Group controlId='signupEmail' className='input-group-sm mt-2'>
                  <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='example@email.com'
                    />
                  </Form.Group>
                  <Form.Group controlId='signupBirthday' className='input-group-sm mt-2'>
                  <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder='MM/DD/YYYY'
                    />
                  </Form.Group>
                  <Button
                    className='mt-3'
                    variant='primary'
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