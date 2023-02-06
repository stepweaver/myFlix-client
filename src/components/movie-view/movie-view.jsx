import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({ movies, user, updateUserOnFav }) => {
  console.log('MovieView prop', updateUserOnFav);
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  
  let similarMovies = movies.filter((filteredMovie) => {
    return (
      filteredMovie.genre.name === movie.genre.name &&
      filteredMovie.title !== movie.title
    );
  });

  return (
    <>
      <Row className='d-flex flex-row-reverse p-3'>
        <Col md={5} className='text-center text-md-end'>
          <img
            src={movie.imageURL}
            alt={`Poster for ${movie.title}`}
            className='img-fluid h-100 w-auto movie-view-img'
          />
        </Col>
        <Col md={7} className='d-flex flex-column'>
          <Row className='d-flex flex-row justify-content-between'>
            <Col md={9} className='d-flex flex-column'>
              <h3 className='my-0'>
                <span>Title: </span>
                <span>{movie.title}</span>
              </h3>
              <h5 className='mt-1 text-left text-muted'>
                <span>Release: </span>
                <span>{movie.director.name}</span>
              </h5>
            </Col>
            <Col md={3} className='align-self-end mb-2 text-end'>
              <span>Genre: </span>
              <span className='fw-bolder'>{movie.genre.name}</span>
            </Col>
          </Row>
          <div className='mt-md-5 mb-4'>
            <div className='text-decoration-underline mb-2'>Description: </div>
            <span>{movie.description}</span>
          </div>
          <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
            <Col className='text-start'>
              <FavoriteIcon
                user={user}
                movie={movie}
                updateUserOnFav={updateUserOnFav}
              />
            </Col>
            <Col className='text-end'>
              <Link to={`/`}>
                <Button variant='secondary' size='lg'>
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <h2 className='mt-0'>Similar movies</h2>
        <hr />
        {console.log(similarMovies)}
        {similarMovies.map((movie) => (
          <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movieData={movie}
              user={user}
              updateUserOnFav={(user) => {
                console.log('Update user:', user);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      director: PropType.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired
      }).isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      year: PropTypes.string.isRequired,
      rating: ProptTypes.string.isRequired,
      actors: PropTypes.arrayOf(
        [].string.isRequired
      )
    })
  ).isRequired
};

    // <div>
    //   <div>
    //     <img className='w-50 mb-2' src={movie.imageURL} />
    //   </div>
    //   <div className='mb-2 fs-2 fw-bold'>
    //     <span>{movie.title}</span>
    //   </div>
    //   <div className='mb-3 fs-5'>
    //     <span>{movie.description}</span>
    //     <hr></hr>
    //   </div>
    //   <div className='mb-1'>
    //     <span>Rated: {movie.rating}</span>
    //   </div>
    //   <div className='mb-1'>
    //     <span>Genre: </span>
    //     <span>{movie.genre}</span>
    //   </div>
    //   <div className='mb-1'>
    //     <span>Release Year: </span>
    //     <span>{movie.year}</span>
    //   </div>
    //   <Link to={'/'}>
    //     <Button className='mt-4 outline-light primary' size='sm'>Back</Button>
    //   </Link>
    // </div>