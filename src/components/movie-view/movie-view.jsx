import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';

import './movie-view.scss'

export const MovieView = ({ movies, user, updateUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  window.scrollTo(0, 0);
  
  let similarMovies = movies.filter((filteredMovie) => {
    return (
      filteredMovie.genre.name === movie.genre.name &&
      filteredMovie.title !== movie.title
    );
  });

  return (
    <>
      <Row className='d-flex p-3'>
        <Col className='text-center text-md-end'>
          <img
            src={movie.imageURL}
            alt={`Poster for ${movie.title}`}
            className='img-fluid w-auto movie-view-img square bg-primary rounded-2 text-center text-md-end'
          />
        </Col>
        <Col md={8} className='d-flex flex-column'>
          <h2 className='my-0'>
            <span>{movie.title}</span>
          </h2>
          <h5 className='mt-1 text-left text-muted fw-bolder'>
            <span>{movie.year} | {movie.genre.name}</span>
          </h5>
          <p className='mt-2'>
            <span>{movie.description}</span>
          </p>
          <FavoriteIcon
            user={user}
            movie={movie}
            updateUser={updateUser}
          />
          <Link to={`/`}>
            <Button variant='secondary' size='md' className='fw-bold w-auto mt-5'>
              Back
            </Button>
          </Link>
        </Col>
      </Row>
      {similarMovies.length > 0 && (
        <Row>
          <h2 className='mt-5 mb-5 p-3'>SIMILAR MOVIES</h2>
          {similarMovies.map((movie) => (
            <Col key={movie.id} xl={2} lg={3} md={4} sm={12} xs={12}>
              <MovieCard
                movie={movie}
                user={user}
                updateUser={(user) => {
                  setUser(user);
                  localStorage.setItem('user', JSON.stringify(user));
                }}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired
      }).isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      }).isRequired,
      year: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired
    })
  ).isRequired
};