import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { MovieContext } from '../index';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(MovieContext);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    console.log('Trimmed Username:', trimmedUsername);
    console.log('Trimmed Password:', trimmedPassword);
    if (trimmedUsername === 'admin' && trimmedPassword === 'password') {
      console.log('Login successful');
      dispatch({ type: 'SET_USER', payload: { username: trimmedUsername } });
    } else {
      console.log('Login failed');
      setError('Invalid username or password');
    }
  };

  return (
    <Container style={{ marginTop: '50px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;