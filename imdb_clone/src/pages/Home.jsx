import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]); // Stores default popular movies
  const [searchMovies, setSearchMovies] = useState([]); // Stores search results
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch default popular movies (e.g., Action Movies)
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=action&type=movie&apikey=88165da3`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setPopularMovies(data.Search);
        }
      });
  }, []);

  // Fetch search results and show suggestions
  const fetchMovies = (query) => {
    fetch(`https://www.omdbapi.com/?s=${query}&type=movie&apikey=88165da3`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setSearchMovies(data.Search);
          setSuggestions(data.Search.slice(0, 5)); // Show top 5 suggestions
        } else {
          setSearchMovies([]);
          setSuggestions([]); // Clear suggestions if no results
        }
      });
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length > 1) {
      fetchMovies(term);
    } else {
      setSearchMovies([]); // Clear search results
      setSuggestions([]);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies(searchTerm);
    }
  };

  // Select a suggestion from the dropdown
  const handleSuggestionClick = (title) => {
    setSearchTerm(title); // Set the selected movie title in the search bar
    setSuggestions([]); // Hide suggestions
    fetchMovies(title); // Fetch movies based on selection
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="imdb-text">IMDb</span>
        </Link>
        <Link to="/favorites" className="favorites-link">
          Your Favorites ❤️
        </Link>
      </nav>

      {/* Search Box */}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">🔍</button>
        {/* Movie Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((movie) => (
              <li key={movie.imdbID} onClick={() => handleSuggestionClick(movie.Title)}>
                {movie.Title}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Movies Display */}
      <h2>{searchTerm ? "Search Results" : "Popular Movies"}</h2>
      <div className="movies-grid">
        {(searchTerm ? searchMovies : popularMovies).map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
