import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [ user, setUser ] = useState(storedUser? storedUser : null);
  const [ token, setToken ] = useState(storedToken? storedToken : null);
  const [ movies, setMovies ] = useState([]);
  const [ selectedMovie, setSelectedMovie ] = useState(null);

    useEffect(() => {
      if (!token) return;

      fetch('https://cthulhuflix.onrender.com/movies')
        .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((doc) => {
            return {
              id: doc._id,
              title: doc.title,
              year: doc.year,
              rating: doc.rating,
              description: doc.description,
              genre: doc.genre.name,
              director: doc.director.name,
              image: doc.imageURL,
              actors: doc.actors
            };
          });

          setMovies(moviesFromApi);
        });
    }, [token]);

  return (
    <BrowserRouter>
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
                    <LoginView onLoggedIn={(user) => setUser(user)} />
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
                  <Col md={8}>
                    <MovieView movies={movies} />
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
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className='mb-4 text-light' key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                    <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//     <Row className='justify-content-md-center'>
//       {!user ? (
//         <Col xl ={4} lg={5} md={6} sm={10} xs={12}>
//           <LoginView
//             onLoggedIn={(user, token) => {
//               setUser(user);
//               setToken(token);
//             }}
//           />
//           or
//           <SignupView />
//         </Col>
//       ) : selectedMovie ? (
//         <Col md={8}>
//           <MovieView
//             style={{ border: '1px solid green' }}
//             movieData={selectedMovie}
//             onBackClick={() => setSelectedMovie(null)}
//           />
//         </Col>
//       ) : movies.length === 0 ? (
//         <div>The list is empty!</div>
//       ) : (
//         <>
//           {movies.map((movie) => (
//             <Col className='mb-4 text-light' key={movie.id} md={3}>
//               <MovieCard
//                 movieData={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           ))}
//           <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
//         </>
//       )}
//     </Row>
//   )
// };