import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie, user, updateUserOnFav }) => {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Link className='text-light text-decoration-none' to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className='h-100 bg-transparent'>
        <Card.Img className='h-100 mb-4' variant='top' src={movie.imageURL} />
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
