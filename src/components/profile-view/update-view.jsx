import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card, Container } from 'react-bootstrap';

import './update-view.scss';

export const UpdateView = ({ storedToken, storedUser }) => {
  const [ token, setToken ] = useState(storedToken ? storedToken : null);
  const [ user, setUser ] = useState(storedUser ? storedUser : null);
  const [ username, setUsername ] = useState(user.username);
  const [ password, setPassword ] = useState('');
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
    event.preventDefault
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
            <Card className='bg-transparent p-3 border-primary update-card'>
              <Card.Title className='fs-3 text-uppercase'>Update User Info</Card.Title>
              <Card.Text>* Indicates a required field</Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='forUsername' className='input-group-sm mt-2'>
                  <Form.Label className='text-light text-uppercase'>New Username *</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='5'
                    title='Minimum length: 5 characters'
                    placeholder='Enter new username'
                    className='form-control'
                    style={{ border: 'none', borderBottom: '1px solid green', borderRadius: 0, boxShadow: 'none' }}
                  />
                </Form.Group>
                <Form.Group controlId='forPassword' className='input-group-sm mt-2'>
                  <Form.Label className='text-light text-uppercase'>New Password *</Form.Label>
                  <Form.Control
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    minLength='6'
                    title='Minimum length: 6 characters'
                    placeholder='Enter new password'
                    className='form-control'
                    style={{ border: 'none', borderBottom: '1px solid green', borderRadius: 0, boxShadow: 'none' }}
                  />
                </Form.Group>
                <Form.Group controlId='forEmail' className='input-group-sm mt-2'>
                  <Form.Label className='text-light text-uppercase'>New Email</Form.Label>
                  <Form.Control
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter new email'
                    className='form-control'
                    style={{ border: 'none', borderBottom: '1px solid green', borderRadius: 0, boxShadow: 'none' }}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email
                  </Form.Text>
                </Form.Group>
                <Row>
                  <Col className='text-end'>
                    <Button variant='primary' type='submit' className='text-uppercase fs-5 mt-3 btn-primary w-100 fw-bold'>
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