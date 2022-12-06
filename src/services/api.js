import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const keyApi = '68b42687345b4022b8560be6db5b4136';

export async function getTrending() {
  return await axios.get(`/trending/movie/day?api_key=${keyApi}`);
}

export async function searchMovie(query) {
  return await axios.get(
    `/search/movie?api_key=${keyApi}&language=en-US&query=${query}&page=1&include_adult=false`
  );
}

export async function getMovieDetails(movie_id) {
  return await axios.get(`movie/${movie_id}?api_key=${keyApi}&language=en-US`);
}

export async function getMovieCredits(movie_id) {
  return await axios.get(
    `movie/${movie_id}/credits?api_key=${keyApi}&language=en-US`
  );
}

export async function getMovieReviews(movie_id) {
  return await axios.get(
    `movie/${movie_id}/reviews?api_key=${keyApi}&language=en-US&page=1`
  );
}
