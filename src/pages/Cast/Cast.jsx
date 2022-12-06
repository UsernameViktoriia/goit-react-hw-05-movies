import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import { CastItem } from './Cast.styled';

function Cast() {
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';
  const defaultImgUrl =
    'https://slovoproslovo.info/wp-content/uploads/2021/12/65-1068x712-1-780x470.jpg';

  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieCast = async movieId => {
      try {
        const cast = await getMovieCredits(movieId);
        setMovieCast(cast.data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieCast(movieId);
  }, [movieId]);

  return (
    <div>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      <ul>
        {movieCast.length > 0 ? (
          movieCast.map(actor => {
            return (
              <CastItem key={actor.cast_id}>
                <img
                  alt={actor.name}
                  width="200"
                  height="300"
                  src={
                    actor.profile_path
                      ? baseImgUrl + actor.profile_path
                      : defaultImgUrl
                  }
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </CastItem>
            );
          })
        ) : (
          <p>We don't have any casts for this movie</p>
        )}
      </ul>
    </div>
  );
}
export default Cast;
