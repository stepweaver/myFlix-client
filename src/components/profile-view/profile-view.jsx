import React from 'react';

import { UpdateView } from './updateView';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { DeleteUser } from './delete-user';

export const ProfileView = ({ movies }) => {
  const storedToken = localStorage.getItem('token');
  
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <UserInfo user={storedUser} />
      <UpdateView storedToken={storedToken} storedUser={storedUser} />
      <DeleteUser storedToekn={storedToken} storedUser={storedUser} />
      <FavortieMovies movies={movies} storedUser={storedUser} />
    </>
  );
};