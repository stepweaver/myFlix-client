import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs';

export const FavoriteIcon = ({ user, movie, updateUserOnFav }) => {
  let updatedUser = { ...user };
  if (!updatedUser.FavoriteMovies || !Array.isArray(updatedUser.FavoriteMovies)) {
    updatedUser.FavoriteMovies = [];
  }

  const token = localStorage.getItem('token');

  const alreadyFavorite = updatedUser.FavoriteMovies && updatedUser.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  );

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://cthulhuflix.onrender.com/users/${updatedUser.username}/movies/${movie.id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let resultAlert = '';
    let iconChange;

    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      resultAlert = `${movie.title} removed from Favorites`;
      iconChange = () =>
        document.querySelector('svg').classList.remove('favorite-movie');
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter((favMovieId) => favMovieId !== movie.id);
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.title} added to Favorites`;
      iconChange = () =>
      document.querySelector('svg').classList.add('favorite-movie');
      updatedUser.FavoriteMovies.push(movie.id);
    }

    fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      alert(`${resultAlert}`);
      updateUserOnFav(updatedUser);
      iconChange();
    })
    .catch((e) => {
      alert('Oops! Something went wrong.');
    });
};

  return (
    <Link
      onClick={() => toggleFavorite()}
      className='favorite-icon'
      id='favMovieButton'
      style={{ textDecoration: 'none', color: 'green' }}
    >
      {alreadyFavorite ? <BsPlusSquare className='favorite-movie' style={{ fontSize: '30px' }} /> : <BsPlusSquare style={{ fontSize: '35px' }} />}
      <span className='fw-bold' style={{ marginLeft: '10px', fontSize: '20px' }}>{alreadyFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
    </Link>
  );
};