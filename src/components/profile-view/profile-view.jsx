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
      <Row className='mt-5'>
        <Col>
          <UpdateView storedToken={storedToken} storedUser={storedUser} />
        </Col>
        <Col className='mx-5'>
          <UserInfo user={storedUser} />
          <DeleteUser storedToken={storedToken} storedUser={storedUser} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <FavoriteMovies movies={movies} storedUser={storedUser} />
      </Row>
    </>
  );
};

//TODO: Add 'remove from favorites' option to the ProfileView Rendered favorites. Similarly, add 'add to favorites option to the similar movies cards'.