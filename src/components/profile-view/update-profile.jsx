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
}