import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../context/UserContext";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

export default function Nav() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    // handle typing only updates query
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // handle search submit navigates to results page
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/search/${encodeURIComponent(query)}`);
        }
    };

    function formatGenre(genre) {
        const romanNumerals = [
            "i",
            "ii",
            "iii",
            "iv",
            "v",
            "vi",
            "vii",
            "viii",
            "ix",
            "x",
        ];
        return genre
            .split("_")
            .map((word) => {
                if (romanNumerals.includes(word.toLowerCase())) {
                    return word.toUpperCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((res) => res.json())
            .then((data) => {
                const uniqueGenres = [
                    ...new Set(data.map((book) => book.genre)),
                ];
                setGenres(uniqueGenres.slice(0, 8));
            });
    }, []);

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
                            onChange={handleChange}
                            className="w-full max-w-lg"
                        />
                        <IconButton type="submit" color="primary">
                            <SearchIcon />
                        </IconButton>
                    </form>
                </div>

                <div className="nav-center">
                    <h1 className="site-title">
                        <Link to="/">Books-R-Us</Link>
                    </h1>
                </div>

                <div className="nav-right">
                    {user ? (
                        <Button
                            component={Link}
                            to="/account"
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
                            My Account
                        </Button>
                    ) : (
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
                            Sign In
                        </Button>
                    )}

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
                {genres.map((genre) => (
                    <Link key={genre} to={`/genre/${genre}`}>
                        {formatGenre(genre)}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
