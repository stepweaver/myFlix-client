import { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [ movies, setMovies ] = useState([]);
  const [ user, setUser ] = useState(storedUser ? storedUser : null);
  const [ token, setToken ] = useState(storedToken ? storedToken : null);

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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Row className='justify-content-md-center'>
          <Routes>
            <Route
              path='/register'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
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
                    <Col md={5}>
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
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <MovieView
                        movies={movies}
                        user={user}
                        updateUserOnFav={(user) => {
                          console.log('Update user:', user);
                          setUser(user);
                          localStorage.setItem('user', JSON.stringify(user));
                        }}
                      />
                    </Col>
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
                      {movies.map((movie) => (
                        <Col className='mb-b' key={movie.id} xs={12} sm={6} md={4} lg={3}>
                          <MovieCard
                            movieData={movie}
                            user={user}
                            updateUserOnFav={(user) => {
                              console.log('Update user:', user);
                              setUser(user);
                              localStorage.setItem('user', JSON.stringify(user));
                            }}
                          />
                        </Col>
                      ))}
                      <Row>
                        <Col className='text-end mt-2'>
                          <Button
                            onClick={() => {
                              setUser(null);
                              setToken(null);
                              localStorage.clear();
                            }}
                            variant='primary'
                            size='sm'
                            className='mb-5'
                          >
                            Sign Out
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </>
              }
            />
            <Route
              path='/users/:username'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : (
                    <Col>
                      <ProfileView movies={movies} />
                    </Col>
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