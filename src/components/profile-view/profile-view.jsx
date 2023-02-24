import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { UpdateView } from './update-view';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { DeleteUser } from './delete-user';

export const ProfileView = ({ movies }) => {
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Row>
        <Col className='mt-5'>
          <UserInfo user={storedUser} />
          <DeleteUser storedToken={storedToken} storedUser={storedUser} />
        </Col>
        <Col className='mt-5'>
          <UpdateView storedToken={storedToken} storedUser={storedUser} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <FavoriteMovies movies={movies} storedUser={storedUser} />
      </Row>
    </>
  );
};