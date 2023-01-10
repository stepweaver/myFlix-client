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
          const moviesFromApi = data.map((item) => {
            return {
              id: item._id,
              title: item.title,
              year: item.year,
              rating: item.rating,
              description: item.description,
              genre: {
                name: item.genre.name,
                description: item.genre.description
              },
              director: {
                name: item.director.name,
                bio: item.director.bio
              },
              image: item.imageURL,
              actors: item.actors
            };
          });

          setMovies(moviesFromApi);
        });
    }, [token]);

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col xl ={4} lg={5} md={6} sm={10} xs={12}>
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
            <Col className='mb-4 text-light' key={movie.id} md={3}>
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