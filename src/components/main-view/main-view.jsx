import React from 'react';
import { useState } from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
      id: 1,
      title: 'Memento',
      image: 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
      director: 'Christopher Nolan',
      year: '2000',
      genre: 'Mystery',
      rating: 'R',
      description: 'A man with short-term memory loss attempts to track down his wife\'s murderer.'
    },
    { 
      id: 2,
      title: 'Grandma\'s Boy',
      image: 'https://m.media-amazon.com/images/M/MV5BMDFiYzQ0NzktMGNkNy00YTQ0LTgxODgtNDViNGIxMTc1NGFjL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      director: 'Nicholaus Goosen'
    },
    {
      id: 3,
      title: 'The Batman',
      image: 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg',
      director: 'Matt Reeves'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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