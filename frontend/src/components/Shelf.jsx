import { useEffect } from "react";
import "./Shelf.css";
import Button from "@mui/material/Button";
import Book from "./Book";

export default function Shelf({ genre, books }) {
    return (
        <div className="shelf-container">
            <div className="title-button-container">
                <h1>{genre}</h1>
                <Button
                    // component={Link}
                    // to="/signin"
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
                    See More
                </Button>
            </div>

            <div className="all-books-container">
                {books.map((book) => {
                    return (
                        <Book
                            key={book.id}
                            cover={book.cover}
                            title={book.title}
                            author={book.author}
                        />
                    );
                })}
            </div>
        </div>
    );
}
