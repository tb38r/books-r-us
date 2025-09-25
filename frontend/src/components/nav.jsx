import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./Nav.css";

export default function Nav() {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => setQuery(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  function formatGenre(genre) {
    const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
    return genre
      .split("_")
      .map((word) =>
        romanNumerals.includes(word.toLowerCase())
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  }

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        const uniqueGenres = [...new Set(data.map((book) => book.genre))];
        setGenres(uniqueGenres.slice(0, 8));
      });
  }, []);

  return (
    <header className="nav-container">
      <div className="nav-top">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Books-R-Us" className="logo-img" />
        </Link>

        <form onSubmit={handleSearch} className="nav-search">
          <input
            type="text"
            placeholder="Search books or authors"
            value={query}
            onChange={handleChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <SearchIcon className="search-icon" />
          </button>
        </form>

        <div className="nav-actions">
          {user ? (
            <Link to="/account" className="nav-button">My Account</Link>
          ) : (
            <Link to="/signinsignup" className="nav-button">Sign In</Link>
          )}
          <Link to="/cart" className="nav-button cart">
            <ShoppingCartIcon fontSize="small" />
            Cart
          </Link>
        </div>
      </div>

      <nav className="nav-bottom">
        {genres.map((genre) => (
          <Link key={genre} to={`/genre/${genre}`} className="genre-link">
            {formatGenre(genre)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
