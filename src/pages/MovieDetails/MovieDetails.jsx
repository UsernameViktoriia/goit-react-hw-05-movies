import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Button } from 'components/Button/Button';
import { getMovieDetails } from '../../services/api';
import {
  AdditionalList,
  MovieNameWrapper,
  MoviesDetailsWrapper,
  MovieWrapper,
} from './MovieDetails.styled';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

function MovieDetails() {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';
  const defaultImgUrl =
    'https://us.123rf.com/450wm/talex/talex1706/talex170600006/80260187-concept-de-temps-cin%C3%A9ma-et-film-avec-bobine-de-film-ic%C3%B4nes-plats-pop-corn-tasse-de-papier-lunettes-3.jpg?ver=6';
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async movieId => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovieData(movieDetails.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMovieDetails(movieId);
    // eslint-disable-next-line
  }, [movieId]);

  const handleGoBack = () => {
    const search = location?.state?.search || '';
    const from = location?.state?.from || '';
    navigate(`${from}${search}` || '/');
  };

  return (
    <MoviesDetailsWrapper>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      <Button onClick={handleGoBack}>Go back</Button>
      {movieData && (
        <MovieWrapper>
          <img
            alt={movieData.title}
            width="500"
            height="750"
            src={
              movieData.poster_path
                ? baseImgUrl + movieData.poster_path
                : defaultImgUrl
            }
          ></img>
          <MovieNameWrapper>
            <h2>
              <b>{movieData.title}</b>
            </h2>
            <p>User Score: {(movieData.vote_average * 10).toFixed(2)}%</p>
            <h2>Overview</h2>
            <p>{movieData.overview}</p>
            <h4>Genres</h4>
            <p>{movieData.genres.map(genre => genre.name).join(', ')}</p>
          </MovieNameWrapper>
        </MovieWrapper>
      )}

      <div>
        <hr></hr>
        <p>Additional information</p>
        <AdditionalList>
          <li>
            <Link
              to={`/movies/${movieData?.id}/cast`}
              state={{
                from: location?.state?.from,
                search: location?.state?.search,
              }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={`/movies/${movieData?.id}/reviews`}
              state={{
                from: location?.state?.from,
                search: location?.state?.search,
              }}
            >
              Reviews
            </Link>
          </li>
        </AdditionalList>
        <hr></hr>
      </div>
      <Suspense fallback={<p>Wait, page is downloading...😒</p>}>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </MoviesDetailsWrapper>
  );
}

export default MovieDetails;
