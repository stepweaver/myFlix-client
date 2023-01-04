import { useState } from 'react';

export const SignupView = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='2'
          placeholder='Enter Username'
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          placeholder='Enter Password'
        />
      </label>
      <label>
        Email:
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='example@email.com'
        />
      </label>
      <label>
        Birthday:
        <input
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder='MM/DD/YYYY'
        />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};