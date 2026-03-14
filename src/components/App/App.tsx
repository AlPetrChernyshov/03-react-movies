import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar.tsx';
import { MovieGrid } from '../MovieGrid/MovieGrid.tsx';
import { Loader } from '../Loader/Loader.tsx';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage.tsx';
import { MovieModal } from '../MovieModal/MovieModal.tsx';
import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setError(false);
      setIsLoading(true);

      const { results } = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(results);
    } catch  {
      setError(true);
      toast.error('Failed to fetch movies.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      
      {error && <ErrorMessage />}
      
      {movies.length > 0 && !isLoading && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {isLoading && <Loader />}

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      <Toaster position="top-right" />
    </>
  );
}