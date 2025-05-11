import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

const API_KEY = 'e8c6637c370a65af23e32d8332b056bf';

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Card>
        <CardMedia
          component="img"
          height="500"
          image={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {movieDetails.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {movieDetails.overview}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Release Date: {movieDetails.release_date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Rating: {movieDetails.vote_average}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default MovieDetails;