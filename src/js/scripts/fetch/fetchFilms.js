import axios from 'axios';

const moviesFetch = (key, page) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&language=en-US&${page}`;
  return axios(url).then(response => response.data);
};

const searchFetch = (key, query, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&${page}`;
  return axios(url).then(response => response.data);
};

const filmFetchById = (key, id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
  return axios(url).then(response => response.data);
};

export { moviesFetch, searchFetch, filmFetchById };
