import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Login from './components/Login';
import { MovieContext } from './index';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { state } = useContext(MovieContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (!state.user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Movie Explorer
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
