import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Link className='text-light text-decoration-none' to={`/movies/${encodeURIComponent(movie.id)}`}>
      <Card className='h-100 bg-dark'>
        <Card.Img variant='top' src={movie.imageURL} />
        <Card.Body>
          <Card.Title className='text-end'>{movie.title}</Card.Title>
          <Card.Text className='text-end'>{movie.year}</Card.Text>
        </Card.Body>
        {/* <Button className='logout'>Logout</Button>  */}
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