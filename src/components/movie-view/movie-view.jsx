import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
      <div>
        <img className='w-50' src={movie.imageURL} />
      </div>
      <br />
      <div>
        <span>{movie.title} | </span>
        <span>Rated: {movie.rating}</span>
      </div><br />
      <div>
        <span>Release Year: </span>
        <span>{movie.year}</span>
      </div><br />
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div><br />
      <div>{movie.description}</div>
      <Link to={'/'}>
        <Button className='mt-4 outline-light primary' size='sm'>Back</Button>
      </Link>
    </div>
  );
};