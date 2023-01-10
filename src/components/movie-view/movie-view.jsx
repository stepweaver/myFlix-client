import { Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img className='w-50' src={movie.image} />
      </div>
      <br />
      <div>{movie.title}</div><br />
      <div>
        <span>Year: </span>
        <span>{movie.year}, </span>
        <span>Rated: </span>
        <span>{movie.rating}</span>
      </div><br />
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div><br />
      <div>{movie.description}</div><br />
      <Button
        variant='primary'
        onClick={onBackClick}
      >
        Back
      </Button>
    </div>
  );
};