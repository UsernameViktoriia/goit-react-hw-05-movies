import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import { StyledNavLink, StyledNav } from './App.styled';

const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <div
      style={{
        marginLeft: 20,
        padding: 50,
        fontSize: 40,
        color: '#010101',
      }}
    >
      <StyledNav>
        <StyledNavLink to="/">Home</StyledNavLink>

        <StyledNavLink to="/movies">Movies</StyledNavLink>
      </StyledNav>
      <Suspense fallback={<p>Wait, page is downloading...😒</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId/*" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};
