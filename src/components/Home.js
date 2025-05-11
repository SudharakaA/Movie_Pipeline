import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { MovieContext } from '../index';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const API_KEY = 'e8c6637c370a65af23e32d8332b056bf';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const { dispatch } = useContext(MovieContext);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week',
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: API_KEY,
            query: searchQuery,
            page,
            with_genres: genre,
            primary_release_year: year,
            'vote_average.gte': rating,
          },
        }
      );
      setSearchResults((prevResults) => [...prevResults, ...response.data.results]);
      dispatch({ type: 'SET_LAST_SEARCHED_MOVIE', payload: searchQuery });
    } catch (error) {
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
        handleSearch={handleSearch}
      />

      {error && <Typography color="error">{error}</Typography>}

      {loading && <CircularProgress />}

      {searchResults.length > 0 ? (
        <Grid container spacing={3}>
          {searchResults.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {trendingMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Home;