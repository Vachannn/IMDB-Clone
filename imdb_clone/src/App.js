import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import "./App.css";

const App = () => {
  // State to store favorite movies
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the app starts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to add a movie to favorites
  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
    alert("Added to Favorites! ❤️");
  };

  // Function to remove a movie from favorites
  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails addToFavorites={addToFavorites} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} onRemoveFavorite={removeFromFavorites} />} />
      </Routes>
    </Router>
  );
};

export default App;
