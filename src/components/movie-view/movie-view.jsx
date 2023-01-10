import { Button } from 'react-bootstrap';

export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <div>
        <img className='w-50' src={movieData.image} />
      </div>
      <br />
      <div>{movieData.title}</div><br />
      <div>
        <span>Year: </span>
        <span>{movieData.year}, </span>
        <span>Rated: </span>
        <span>{movieData.rating}</span>
      </div><br />
      <div>
        <span>Genre: </span>
        <span>{movieData.genre}</span>
      </div><br />
      <div>{movieData.description}</div><br />
      <Button
        variant='primary'
        onClick={onBackClick}
      >
        Back
      </Button>
    </div>
  );
};