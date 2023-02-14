import React from 'react';
import { BsFillPlusSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const FavoriteIcon = ({ user, movie, updateUserOnFav }) => {
  if (!user) return null;

  const token = localStorage.getItem('token');

  const alreadyFavorite = user.FavoriteMovies ? user.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  ) : false;

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://cthulhuflix.onrender/users/${user.username}/movies/${movie.id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let resultAlert = '';
    let iconChange;

    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      resultAlert = `${movie.title} is deleted from the list of favorites`;
      iconChange = () =>
        document.querySelector('svg').classList.remove('favorite-movie');
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.title} is added to the list of favorites`;
      iconChange = () =>
        document.querySelector('svg').classList.add('favorite-movie');
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(`${resultAlert}`);
        updateUserOnFav(data);
        iconChange();
      })
      .catch((e) => {
        alert('What did you do!? Something went wrong.');
      });
  };

  return (
    <Link
      onClick={() => toggleFavorite()}
      className='favorite-icon'
      id='favMovieButton'
    >
      {alreadyFavorite ? <BsFillPlusSquare className='favorite-movie' /> : <BsFillPlusSquare />}
    </Link>
  );
};
