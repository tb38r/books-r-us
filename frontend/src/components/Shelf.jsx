import { useEffect } from "react";
import "./Shelf.css";
import Button from "@mui/material/Button";
import Book from "./Book";
import { Link } from "react-router-dom";

export default function Shelf({ genre, books, urlGenre }) {
    return (
        <div className="shelf-container">
            <div className="title-button-container">
                <Link to={`/genre/${urlGenre}`}>
                    <h1>{genre}</h1>
                </Link>
                <Button
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
                    <Link to={`/genre/${urlGenre}`}>See More</Link>
                </Button>
            </div>

            <div className="all-books-container">
                {books.map((book) => {
                    return (
                        <Book
                            key={book.id}
                            cover={book.coverUrl}
                            title={book.title}
                            author={book.author}
                            id={book.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
