import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [ user, setUser ] = useState(storedUser? storedUser : null);
  const [ token, setToken ] = useState(storedToken? storedToken : null);
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovie ] = useState(null);

    useEffect(() => {
      if (!token) return;

      fetch('https://cthulhuflix.onrender.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              id: movie._id,
              title: movie.title,
              year: movie.year,
              rating: movie.rating,
              description: movie.description,
              genre: movie.genre.name,
              director: movie.director.name,
              image: movie.imageURL,
              actors: movie.actors
            };
          });

          setMovies(moviesFromApi);
        });
    }, [token]);

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={4}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            style={{ border: '1px solid green' }}
            movieData={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className='mb-4' key={movie.id} md={3}>
              <MovieCard
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      )}
    </Row>
  )
};