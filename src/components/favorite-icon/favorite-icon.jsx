import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusSquare, FiMinusSquare } from 'react-icons/all';

export const FavoriteIcon = ({ user, movie, updateUser }) => {
  let updatedUser = { ...user };
  if (!updatedUser.FavoriteMovies || !Array.isArray(updatedUser.FavoriteMovies)) {
    updatedUser.FavoriteMovies = [];
  }

  const token = localStorage.getItem('token');

  const [isFavorite, setIsFavorite] = useState(
    updatedUser.FavoriteMovies.includes(movie.id)
  );

  useEffect(() => {
    setIsFavorite(updatedUser.FavoriteMovies.includes(movie.id));
  }, [movie, updatedUser]);

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://cthulhuflix.onrender.com/users/${updatedUser.username}/movies/${movie.id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let resultAlert = '';

    if (isFavorite) {
      requestOptions.method = 'DELETE';
      resultAlert = `${movie.title} removed from Favorites`;
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter(
        (favMovieId) => favMovieId !== movie.id
      );
    } else {
      requestOptions.method = 'POST';
      resultAlert = `${movie.title} added to Favorites`;
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
        updateUser(updatedUser);
        setIsFavorite(!isFavorite);
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
      {isFavorite ? (
        <FiMinusSquare className='favorite-movie' style={{ fontSize: '35px' }} />
      ) : (
        <FiPlusSquare style={{ fontSize: '35px' }} />  
      )}
      <span className='fw-bold' style={{ marginLeft: '10px', fontSize: '20px' }}>
        {isFavorite ? 'Remove Favorite' : 'Add Favorites'}
      </span>
    </Link>
  );
};