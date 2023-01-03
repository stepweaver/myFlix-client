import React from 'react';
import { useState, useEffect } from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovie ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ token, setToken ] = useState(null);

    useEffect(() => {
      if (!token) {
        return;
      }

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

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  } else {
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
        <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
      </div>
    )};
  }
};