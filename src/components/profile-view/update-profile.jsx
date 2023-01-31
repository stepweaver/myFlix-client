import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card } from 'react-bootstrap';

export const UpdateProfile = ({ storedToken, storedUser }) => {
  const [ token, setToken ] = useState(storedToken ? storedToken : null);
  const [ user, setUser ] = useState(storedUser ? storedUser : null);
  const [ username, setUsername ] = useState(user.username);
  const [ password, setPassword ] = useState();
  const [ email, setEmail ] = useState(user.email);
  const [ birthday, setBirthday ] = useState(user.birthday);

  const updateUser = (username) => {
    fetch(`https://cthulhuflix.onrender.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
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
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://cthulhuflix.onrender.com/users/${storedUser.username}`, {
      methopd: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
    <Row className='mt-2'>
      <Col md={5}>
        <CardGroup>
          <Card className='border-0'>
            <Card.Body>
              <div className='text-start h2 mb-0'>Update Profile</div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='update-username' className='mt-2'>
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='2'
                    placeholder='Enter new username'
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='update-password' className='mt-2'>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder='Enter new password'
                  />
                </Form.Group>
                <Form.Group controlId='update-email' className='mt-2'>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter new email'
                  />
                </Form.Group>
                <Form.Group controldId='update-birthday' className='mt-2'>
                  <Form.Label>Birthday: </Form.Label>
                  <Form.Control
                    type='date'
                    onChange={(e) => setBirthday(e.target.value)}
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
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  )
}