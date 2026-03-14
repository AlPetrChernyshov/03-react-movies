import axios from 'axios';
import type { TMDBResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const fetchMovies = async (query: string): Promise<TMDBResponse> => {
  const { data } = await axios.get<TMDBResponse>('search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return data;
};