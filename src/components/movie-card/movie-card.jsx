import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  if (!movie) {
    return <Col>Loading...</Col>;
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
        <Card.Img
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={img => (cardImg = img)}
          className='mb-3 movie-card-img square bg-primary rounded-2'
          src={movie.imageURL}
        />
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired
};