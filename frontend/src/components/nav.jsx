import React from "react";
import Button from "@mui/material/Button";
import "./Nav.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

export default function Nav() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = books.filter(
            (b) =>
                b.title.toLowerCase().includes(value.toLowerCase()) ||
                b.author.toLowerCase().includes(value.toLowerCase())
        );

        setResults(filtered);
    };
    return (
        <header className="nav-header">
            <div className="nav-top">
                <div className="nav-left">
                    <Link to="/">
                        <HomeIcon className="home" />
                    </Link>
                    <form onSubmit={handleSearch} className="flex items-center">
                        <TextField
                            label="Search books or authors"
                            variant="outlined"
                            value={query}
                            onChange={handleSearch}
                            className="w-full max-w-lg"
                        />
                        <IconButton type="submit" color="primary">
                            <SearchIcon />
                        </IconButton>
                    </form>
                </div>

                <div className="nav-center">
                    <h1 className="site-title">
                        <Link to="/">Books‑R‑Us</Link>
                    </h1>
                </div>

                <div className="nav-right">
                    <Button
                        component={Link}
                        to="/signinsignup"
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
                <Link to="/genre/scifi">Science Fiction</Link>
                <Link to="/genre/fantasy">Fantasy</Link>
                <Link to="/genre/romance">Romance</Link>
                <Link to="/genre/mystery">Mystery</Link>
                <Link to="/genre/thriller">Thriller</Link>
                <Link to="/genre/horror">Horror</Link>
                <Link to="/genre/historical">Historical</Link>
            </nav>
        </header>
    );
}
