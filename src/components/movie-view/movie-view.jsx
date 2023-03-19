import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';

import './movie-view.scss'

export const MovieView = ({ movies, user, updateUserOnFav }) => {
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
        <Col md={4} className='text-center text-md-end'>
          <img
            src={movie.imageURL}
            alt={`Poster for ${movie.title}`}
            className='img-fluid h-100 w-auto movie-view-img'
          />
        </Col>
        <Col md={5} className='d-flex flex-column'>
          <Row className='d-flex flex-row justify-content-between'>
            <Col md={9} className='d-flex flex-column'>
              <h2 className='my-0'>
                <span>{movie.title}</span>
              </h2>
              <h5 className='mt-1 text-left text-muted fw-bolder'>
                <span>{movie.year} | {movie.genre.name}</span>
              </h5>
            </Col>
          </Row>
          <div className='mt-2'>
            <span>{movie.description}</span>
          </div>
          <Row className='d-flex flex-row justify-content-between mt-auto mb-5 text-start'>
            <FavoriteIcon
              user={user}
              movie={movie}
              updateUserOnFav={updateUserOnFav}
            />
          </Row>
          <Row className='mb-3'>
            <Link to={`/`}>
              <Button variant='secondary' size='md' className='fw-bold w-25'>
                HOME
              </Button>
            </Link>
          </Row>
          <Row>
            <Link to={`/users/${user.username}`}>
              <Button variant='secondary' size='md' className='fw-bold w-25'>
                PROFILE
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
      {similarMovies.length > 0 && (
        <Row>
          <h2 className='mt-5 mb-5 p-3'>SIMILAR MOVIES</h2>
          {similarMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
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