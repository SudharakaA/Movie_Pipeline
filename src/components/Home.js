import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Card, CardMedia, CardContent, Typography, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { MovieContext } from '../index';

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

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      handleSearch(new Event('submit'));
    }
  }, [page]);

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <TextField
          label="Search for a movie"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="28">Action</MenuItem>
            <MenuItem value="35">Comedy</MenuItem>
            <MenuItem value="18">Drama</MenuItem>
            <MenuItem value="27">Horror</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Year"
          type="number"
          variant="outlined"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          label="Rating (>=)"
          type="number"
          variant="outlined"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      {error && <Typography color="error">{error}</Typography>}

      {loading && <CircularProgress />}

      {searchResults.length > 0 ? (
        <Grid container spacing={3}>
          {searchResults.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Release Year: {new Date(movie.release_date).getFullYear()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {trendingMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Release Year: {new Date(movie.release_date).getFullYear()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {movie.vote_average}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {searchResults.length > 0 && (
        <Button onClick={loadMore} variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Load More
        </Button>
      )}

      <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
        Trending Movies Today
      </Typography>
      <Grid container spacing={3}>
        {trendingMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Release Year: {new Date(movie.release_date).getFullYear()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;