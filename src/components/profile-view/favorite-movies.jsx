import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ movies, storedUser }) => {
  const [ user, setUser ] = useState(storedUser || {});
  let favoriteMoviesList = movies.filter((m) =>
    user && user.FavoriteMovies && user.FavoriteMovies.includes(m.id)
  );

  return (
    <Row>
      {favoriteMoviesList.length === 0 ? (
        <Col>No favorites selected</Col>
      ) : (
        <>
          <div className='text-start h2 mb-4'>FAVORITES</div>
          {favoriteMoviesList.map((movie) => (
            <Col className='mt-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                user={user}
                updateUserOnFav={(user) => {
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
