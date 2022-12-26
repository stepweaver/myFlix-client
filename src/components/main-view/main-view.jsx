import React from 'react';
import { useState, useEffect } from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
      fetch('https://cthulhuflix.onrender.com/movies')
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((m) => {
            return {
              id: m._id,
              title: m.title,
              year: m.year,
              rating: m.rating,
              description: m.description,
              genre: m.genre.name,
              director: m.director.name,
              image: m.imageURL,
              actors: m.actors
            };
          });

          setMovies(moviesFromApi);
          console.log('movies from api:', data);
        });
    }, []);

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
      </div>
    )};
  }
};