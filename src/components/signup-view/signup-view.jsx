import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
      birthday: birthday
    };

    fetch('https://cthulhuflix.onrender.com/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }).then ((response) => {
      if (response.ok) {
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='signupUsername'>
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
      <Form.Group controlId='signupPassword'>
      <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          placeholder='Enter Password'
        />
      </Form.Group>
      <Form.Group controlId='signupEmail'>
      <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='example@email.com'
        />
      </Form.Group>
      <Form.Group controlId='signupBirthday'>
      <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder='MM/DD/YYYY'
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