import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card, Container } from 'react-bootstrap'; 

export const UpdateView = ({ storedToken, storedUser }) => {
  const [ token, setToken ] = useState(storedToken ? storedToken : null);
  const [ user, setUser ] = useState(storedUser ? storedUser : null);

  const [ username, setUsername ] = useState(user.username);
  const [ password, setPassword ] = useState();
  const [ email, setEmail ] = useState(user.email);
  const [ birthday, setBirthday ] = useState(user.birthday);

  const updateUser = (username) => {
    fetch(`https://cthulhuflix.onrender.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    fetch(`https://cthulhuflix.onrender.com/users/${storedUser.username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        alert('Profile updated');
        updateUser(username);
      } else {
        alert('Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <CardGroup>
            <Card className='bg-transparent p-3 border-primary'>
                <Card.Title className='text-center fs-4 fw-bold'>Update User Info</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='forUsername' className='input-group-sm mt-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='2'
                      title='Minimum length: 2 characters'
                      placeholder='Enter new username'
                    />
                    <Form.Text className='text-muted'>
                      We'll never share your email.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='forPassword' className='mt-2'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength='6'
                      title='Minimum length: 6 characters'
                      placeholder='Enter new password'
                    />
                  </Form.Group>
                  <Form.Group controlId='forEmail' className='mt-2'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter new email'
                    />
                  </Form.Group>
                  <Row>
                    <Col className='text-end'>
                      <Button variant='primary' type='submit' className='mt-3'>
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};