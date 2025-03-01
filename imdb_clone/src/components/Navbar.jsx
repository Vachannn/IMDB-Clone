import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css"; // External CSS

const Navbar = ({ setSearchQuery }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">IMDb Clone</Link>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Link to="/favorites" className="favorites-link">Your Favorites ❤️</Link>
    </nav>
  );
};

export default Navbar;
