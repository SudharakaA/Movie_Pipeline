import React, { useState, useEffect, useContext } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { MovieContext } from '../index';

function Favorites() {
  const { state, dispatch } = useContext(MovieContext);

  const removeFavorite = (id) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      {state.favorites.length > 0 ? (
        <Grid container spacing={3}>
          {state.favorites.map((movie) => (
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFavorite(movie.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No favorite movies added yet.</Typography>
      )}
    </div>
  );
}

export default Favorites;