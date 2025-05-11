import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function SearchBar({ searchQuery, setSearchQuery, genre, setGenre, year, setYear, rating, setRating, handleSearch }) {
  return (
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
  );
}

export default SearchBar;