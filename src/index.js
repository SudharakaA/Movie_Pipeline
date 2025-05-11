import React, { createContext, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const initialState = {
  lastSearchedMovie: localStorage.getItem('lastSearchedMovie') || '',
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LAST_SEARCHED_MOVIE':
      localStorage.setItem('lastSearchedMovie', action.payload);
      return { ...state, lastSearchedMovie: action.payload };
    case 'ADD_TO_FAVORITES':
      const updatedFavorites = [...state.favorites, action.payload];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };
    case 'REMOVE_FROM_FAVORITES':
      const filteredFavorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MovieProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MovieProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
