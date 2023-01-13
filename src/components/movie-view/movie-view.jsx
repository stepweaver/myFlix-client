import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
      <div>
        <img className='w-50 mb-2' src={movie.imageURL} />
      </div>
      <div className='mb-2 fs-2 fw-bold'>
        <span>{movie.title}</span>
      </div>
      <div className='mb-3 fs-5'>
        <span>{movie.description}</span>
        <hr></hr>
      </div>
      <div className='mb-1'>
        <span>Rated: {movie.rating}</span>
      </div>
      <div className='mb-1'>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div className='mb-1'>
        <span>Release Year: </span>
        <span>{movie.year}</span>
      </div>
      <Link to={'/'}>
        <Button className='mt-4 outline-light primary' size='sm'>Back</Button>
      </Link>
    </div>
  );
};