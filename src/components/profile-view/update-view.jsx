import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card, Container } from 'react-bootstrap';

import './update-view.scss';

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
        alert('Profile updated!');
        updateUser(username);
      } else {
        alert('Oops! Something went wrong');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card className='bg-transparent p-3 border-primary'>
                <Card.Title className='fs-3 fw-bold'>Update User Info</Card.Title>
                <Card.Text>* Indicates a required field</Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='forUsername' className='input-group-sm mt-2'>
                    <Form.Label>New Username *</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='5'
                      title='Minimum length: 5 characters'
                      placeholder='Enter new username'
                    />
                  </Form.Group>
                  <Form.Group controlId='forPassword' className='input-group-sm mt-2'>
                    <Form.Label>New Password *</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                      minLength='6'
                      title='Minimum length: 6 characters'
                      placeholder='Enter new password'
                    />
                  </Form.Group>
                  <Form.Group controlId='forEmail' className='input-group-sm mt-2'>
                    <Form.Label>New Email</Form.Label>
                    <Form.Control
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter new email'
                    />
                    <Form.Text className='text-muted'>
                      We'll never share your email.
                    </Form.Text>
                  </Form.Group>
                  <Row>
                    <Col className='text-end'>
                      <Button variant='primary' type='submit' className='text-light mt-3'>
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