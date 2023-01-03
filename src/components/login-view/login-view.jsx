import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type='text' 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
          minLength='2'
          required
          />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
          required
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};