import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Book from "../components/Book";
import "./ResultsPage.css";

export default function SearchResults() {
    const { searchId } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (b) =>
                        (b.title || "")
                            .toLowerCase()
                            .includes(searchId.toLowerCase()) ||
                        (b.author || "")
                            .toLowerCase()
                            .includes(searchId.toLowerCase())
                );
                setResults(filtered);
            })
            .catch((err) => console.error("Error fetching books:", err));
    }, [searchId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
            <Typography className="results-title" variant="h4" >
                Results for "{searchId}"
            </Typography>

            {results.length > 0 ? (
                <div className="all-books-container flex flex-col gap-4 w-full px-4">
                    {results.map((book) => (
                        <Book
                            key={book.id}
                            cover={book.coverUrl}
                            title={book.title}
                            author={book.author}
                            id={book.id}
                        />
                    ))}
                </div>
            ) : (
                <Typography
                    variant="body1"
                    color="textSecondary"
                    className="text-center"
                >
                    {searchId
                        ? "No results found."
                        : "Start typing to search for books."}
                </Typography>
            )}
        </div>
    );
}
