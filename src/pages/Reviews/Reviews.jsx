import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import { ReviewsItem } from './Reviews.styled';

function Reviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieReviews = async movieId => {
      try {
        const reviews = await getMovieReviews(movieId);

        setMovieReviews(reviews.data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieReviews(movieId);
  }, [movieId]);

  return (
    <div>
      {error.length > 0 && <p>Upss, Some error occured... {error}</p>}
      {movieReviews.length > 0 ? (
        <ul>
          {movieReviews.map(review => {
            return (
              <ReviewsItem key={review.id}>
                <h4>Author: {review.author}</h4>
                <p>{review.content}</p>
              </ReviewsItem>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
export default Reviews;
