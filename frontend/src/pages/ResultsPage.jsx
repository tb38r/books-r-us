import { useEffect, useState } from "react";
import { TextField, Card, CardContent, Typography, Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:1800/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched books:", data);
        setBooks(data);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

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
    <div className="flex flex-col items-center p-6 gap-6">
      <TextField
        label="Search books or authors"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        className="w-full max-w-lg"
      />

      <Typography variant="h5" className="font-semibold">
        Results for "{query}"
      </Typography>

      <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((book) => (
           <Card key={book.id || book.bookid} className="shadow-md rounded-2xl">
                           <CardActionArea onClick={() => navigate(`/book/:bookId`)}>
              <CardContent>
                <Grid item xs={12} md={4}>
            <img
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              style={{
                width: "10%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Grid>
                <Typography variant="h6" className="font-bold">
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
            {query ? "No results found." : "Start typing to search for books."}
          </Typography>
        )}
      </div>
    </div>
  );
}
