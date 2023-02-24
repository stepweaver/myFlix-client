import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie, user, updateUserOnFav }) => {
  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleMouseEnter = () => {
    const images = document.querySelectorAll('.movie-card-img');
    images.forEach(img => {
      if (img !== cardImg) {
        img.classList.add('movie-card-img-highlight');
      }
    });
  };

  const handleMouseLeave = () => {
    const images = document.querySelectorAll('.movie-card-img');
    images.forEach(img => {
      if (img !== cardImg) {
        img.classList.remove('movie-card-img-highlight');
      }
    });
  };

  let cardImg;

  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card
        className='h-100 bg-transparent movie-card'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card.Img
          ref={img => (cardImg = img)}
          className='h-100 mb-5 movie-card-img'
          variant='top'
          src={movie.imageURL}
        />
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