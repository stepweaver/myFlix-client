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
      <div className='mb-2'>
        <span>{movie.title} | </span>
        <span>Rated: {movie.rating}</span>
      </div>
      <div className='mb-2'>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div className='mb-2'>
        <span>Release Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>{movie.description}</div>
      <Link to={'/'}>
        <Button className='mt-4 outline-light primary' size='sm'>Back</Button>
      </Link>
    </div>
  );
};