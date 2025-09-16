import React from "react";
import Button from "@mui/material/Button";
import "./Nav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="nav-header">
      <div className="nav-top">
        <div className="nav-left">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for books..."
          />
        </div>

        <div className="nav-center">
          <h1 className="site-title">Books‑R‑Us</h1>
        </div>

        <div className="nav-right">
          <Button
            component={Link}
            to="/signin"
            variant="outlined"
            className="sign-in-button"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(234, 88, 12, 0.1)",
                border: "1px solid rgb(234 88 12)",
              },
              color: "rgb(234 88 12)",
              border: "1px solid rgb(234 88 12)",
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: 500,
              height: "32px",
              padding: "0 12px",
            }}
          >
            Sign in
          </Button>

          
        <Button
            component={Link}
            to="/cart"
            variant="outlined"
            className="cart-button"
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgb(234 88 12)",
                color: "rgb(234 88 12)",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                height: "32px",
                padding: "0 10px",
                minWidth: "auto",
            }}
            >
        <ShoppingCartIcon fontSize="small" />
        Cart
        </Button>

        </div>
      </div>

      <nav className="nav-bottom">
        <Link to="/scifi">Science Fiction</Link>
        <Link to="/fantasy">Fantasy</Link>
        <Link to="/romance">Romance</Link>
        <Link to="/mystery">Mystery</Link>
        <Link to="/thriller">Thriller</Link>
        <Link to="/horror">Horror</Link>
        <Link to="/historical">Historical</Link>
      </nav>
    </header>
  );
}
