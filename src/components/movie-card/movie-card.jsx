import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card
      className='h-100 bg-dark'
      onClick={() => onMovieClick(movieData)}>
      <Card.Img variant='top' src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.director}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};