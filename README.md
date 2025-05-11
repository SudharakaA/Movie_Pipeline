# Movie Explorer

Movie Explorer is a React-based web application that allows users to search for movies, view details, and discover trending films. The app integrates with The Movie Database (TMDb) API to fetch real-time movie data.

## Features

- **User Login**: Secure login interface with username and password.
- **Search Movies**: Search for movies by name, genre, year, or rating.
- **Trending Movies**: View a grid of trending movies fetched from TMDb.
- **Movie Details**: Detailed view of movies, including overview, genre, cast, and trailer links.
- **Favorites**: Save and manage your favorite movies.
- **Light/Dark Mode**: Toggle between light and dark themes for better user experience.
- **Responsive Design**: Mobile-first design for seamless usage across devices.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://gitlab.com/project124984211/movies.git
   ```
2. Navigate to the project directory:
   ```bash
   cd movies
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

1. Build the app for production:
   ```bash
   npm run build
   ```
2. The production-ready files will be in the `build/` directory.

## API Integration

This app uses The Movie Database (TMDb) API to fetch movie data. To use the app, you need a TMDb API key:

1. Sign up at [TMDb](https://www.themoviedb.org/).
2. Generate an API key from your account settings.
3. Replace the placeholder API key in the code with your actual API key.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Material-UI](https://mui.com/)
- [The Movie Database (TMDb) API](https://developers.themoviedb.org/3)

---

Happy exploring movies with Movie Explorer!
