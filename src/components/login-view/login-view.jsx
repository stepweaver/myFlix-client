import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
          minLength='2'
          required
        />
      </Form.Group>
      <Form.Group conrolId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
          required
        />
      </Form.Group>
      <Button
        className='mt-2'
        variant='secondary'
        type='submit'
      >
        Submit
      </Button>
    </Form>
  );
};