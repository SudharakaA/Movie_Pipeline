import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

function MovieCard({ movie }) {
  return (
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
  );
}

export default MovieCard;