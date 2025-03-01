import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./Favorites.css";

const Favorites = ({ favorites, onRemoveFavorite }) => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      
      {/* Back to Home Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅️ Back to Home
      </button>

      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div 
              key={movie.imdbID} 
              className="favorite-movie"
              onClick={() => navigate(`/movie/${movie.imdbID}`)} // Navigate to movie details page
              style={{ cursor: "pointer" }} // Indicate it's clickable
            >
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering movie details navigation
                  onRemoveFavorite(movie.imdbID);
                }}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
