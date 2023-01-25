import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, storedUser }) => {
  const [ user, setUser ] = useState(storedUser ? storedUser : null);
  let favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m.id)
  );

  return (
    <Row>
      {favoriteMoviesList.length === 0 ? (
        <Col>No favorites</Col>
      ) : (
        <>
          <div className='text-start h2 mb-4'>Favorite Movies</div>
          {favoriteMoviesList.map((movie) => (
            <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                user={user}
                updateUserOnFav={(user) => {
                  console.log('Update user', user);
                  setUser(user);
                  localStorage.setItem('user', JSON.stringify(user));
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};