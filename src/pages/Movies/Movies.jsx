import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Notiflix from 'notiflix';
import { searchMovie } from '../../services/api';
import {
  ButtonForm,
  Form,
  FoundMovies,
  Input,
  MoviesWrapper,
} from './Movies.styled';

function Movies() {
  const location = useLocation();
  const [error, setError] = useState('');
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? '';
  const [foundMovies, setFoundMovies] = useState([]);
  useEffect(() => {
    movieName &&
      searchMovie(movieName)
        .then(({ data }) => {
          if (data.results.length <= 0) {
            return Notiflix.Notify.failure('There is no movies for that name');
          }
          setFoundMovies(data.results);
        })
        .catch(error => {
          setError(error.message);
        });
  }, [movieName]);

  const onSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: inputRef.current.value });
  };
  return (
    <MoviesWrapper>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      <Form onSubmit={onSubmit}>
        <Input ref={inputRef} type="text" name="search" required />
        <ButtonForm type="submit">Search</ButtonForm>
      </Form>

      <FoundMovies>
        {foundMovies.length > 0 &&
          foundMovies.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location.pathname, search: location.search }}
                >
                  {title}
                </Link>
              </li>
            );
          })}
      </FoundMovies>
    </MoviesWrapper>
  );
}
export default Movies;
