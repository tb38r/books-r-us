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

export default function SearchResults() {
    // const [query, setQuery] = useState("");
    const { searchId } = useParams();
    const [results, setResults] = useState([]);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/books")
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
        <div className="flex flex-col items-center p-6 gap-6">
            <Typography variant="h5" className="font-semibold">
                Results for "{searchId}"
            </Typography>

            <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2 lg:grid-cols-3">
                {results.length > 0 ? (
                    results.map((book) => (
                        <Card
                            key={book.id || book.bookid}
                            className="shadow-md rounded-2xl"
                        >
                            <CardActionArea
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <CardContent>
                                    <Grid item xs={12} md={4}>
                                        <img
                                            src={book.cover}
                                            alt={`Cover of ${book.title}`}
                                            style={{
                                                width: "10%",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Grid>
                                    <Typography
                                        variant="h6"
                                        className="font-bold"
                                    >
                                        {book.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {book.author}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        {searchId
                            ? "No results found."
                            : "Start typing to search for books."}
                    </Typography>
                )}
            </div>
        </div>
    );
}
