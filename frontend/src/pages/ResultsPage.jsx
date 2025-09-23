import { useEffect, useState } from "react";
import {
    TextField,
    Card,
    CardContent,
    Typography,
    Grid,
    CardActionArea,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import defaultCover from "../assets/defaultcover.jpg";

export default function SearchResults() {
    // const [query, setQuery] = useState("");
    const { searchId } = useParams();
    const [results, setResults] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

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
            <Typography variant="h5" className="font-semibold text-center">
                Results for "{searchId}"
            </Typography>

            {results.length > 0 ? (
                <div className="grid gap-6 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {results.map((book) => (
                        <Card
                            key={book.id || book.bookid}
                            className="shadow-md rounded-2xl flex flex-col items-center"
                        >
                            <CardActionArea
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <CardContent className="flex flex-col items-center gap-2">
                                    <img
                                        src={book.coverUrl || defaultCover}
                                        alt={`Cover of ${book.title}`}
                                        style={{
                                            width: "120px",
                                            height: "180px",
                                            borderRadius: "8px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        className="font-bold text-center"
                                    >
                                        {book.title}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        className="text-center"
                                    >
                                        {book.author}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
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
