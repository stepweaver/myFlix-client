import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FavoriteIcon } from '../favorite-icon/favorite-icon';

export const MovieCard = ({ movie, user, updateUserOnFav }) => {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Link className='text-light text-decoration-none' to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className='h-100 bg-dark'>
        <Card.Img variant='top' src={movie.imageURL} />
        <Card.Body>
          <Card.Title className='text-end'>{movie.title}</Card.Title>
          <Card.Text className='text-end'>{movie.year}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired
};
