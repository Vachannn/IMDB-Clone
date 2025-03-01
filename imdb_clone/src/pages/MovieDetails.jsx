import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./MovieDetails.css";

const MovieDetails = ({ addToFavorites }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate function
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=88165da3&i=${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>🔙 Back</button>
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <button className="favorite-button" onClick={() => addToFavorites(movie)}>
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
