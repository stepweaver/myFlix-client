import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  const [ movies, setMovies ] = useState([]);
  const [ user, setUser ] = useState(storedUser ? storedUser : null);
  const [ token, setToken ] = useState(storedToken ? storedToken : null);
  const [ viewMovies, setViewMovies ] = useState(movies);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  useEffect(() => {
    if (!token) {
      return;
    }

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
          imageURL: item.imageURL,
          actors: [item.actors]
        };
      });
      setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [token]);

  useEffect(() => {
    setViewMovies(movies);
  }, [movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
        }}
      />
      <Container>
        <Row className='justify-content-center'>
          <Routes>
            <Route
              path='/register'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path='/users/:username'
              element={
                !user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                    updateUser={updateUser}
                  />
                )
              }
            />
            <Route
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      updateUser={updateUser}
                    />
                  )}
                </>
              }
            />
            <Route
              path='/'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
                    <>
                      {viewMovies.map((movie) => (
                        <Col className='mb-b' key={movie.id} xl={2} lg={3} md={4} sm={12} xs={12}>
                          <MovieCard
                            movie={movie}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};