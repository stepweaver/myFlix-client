import React from 'react';
import { Link } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs';

export const FavoriteIcon = ({ user, movie, updateUserOnFav }) => {
  if (!user.FavoriteMovies || !Array.isArray(user.FavoriteMovies)) {
    user.FavoriteMovies = [];
  }

  const token = localStorage.getItem('token');

  const alreadyFavorite = user.FavoriteMovies && user.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  );

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://cthulhuflix.onrender.com/users/${user.username}/movies/${movie.id}`;

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
      resultAlert = `${movie.title} has been deleted from Favorites`;
      iconChange = () =>
        document.querySelector('svg').classList.add('favorite-movie');
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.title} has been added to Favorites`;
      iconChange = () =>
      document.querySelector('svg').classList.remove('favorite-movie');
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(`${resultAlert}`);
        updateUserOnFav(data);
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
      style={{ textDecoration: 'none', color: 'white' }}
    >
      {alreadyFavorite ? <BsPlusSquare className='favorite-movie' style={{ fontSize: '30px' }} /> : <BsPlusSquare style={{ fontSize: '30px' }} />}
      <span className='fw-bold' style={{ marginLeft: '10px' }}>{alreadyFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
    </Link>
  );
};