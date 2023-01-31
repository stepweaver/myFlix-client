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
}