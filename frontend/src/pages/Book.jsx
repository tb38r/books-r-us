import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box,  IconButton,  Tooltip,  Breadcrumbs,  Link,  Typography,  Button,  Rating,  Grid, Card, CardMedia, CardContent} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Book() {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

//   const [book] = useState({
//     id: bookId,
//     title: "Harry Potter and The Sorcerer's Stone",
//     author: "J.K. Rowling",
//     releaseDate: "September 1997",
//     rating: 4,
//     coverImageUrl:
//       "https://covers.openlibrary.org/b/id/7984916-L.jpg", // sample cover
//     price: "£9.99",
//     description:
//       "Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives. But everything changes when a mysterious letter arrives, inviting him to a school of magic...",
//   });

  useEffect(() => {
  fetch("/books.json")
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched JSON:", data);
      console.log("bookId from URL:", bookId);
      const foundBook = data.books.find((b) => String(b.id) === String(bookId));
      console.log("Matched book:", foundBook);
      setBook(foundBook);
    })
    .catch((err) => console.error("Error fetching book:", err));
}, [bookId]);


if (!book) {
    return <Typography>Loading book details...</Typography>;
  }

  return (
    <>
      <Breadcrumbs separator="›" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/genre/fantasy">
          Fantasy Books
        </Link>
        <Link underline="hover" color="inherit" href="/series/harry-potter">
          Harry Potter Book Series
        </Link>
        <Typography color="text.primary">{book.title}</Typography>
      </Breadcrumbs>

      <Box
        sx={{
          bgcolor: "#fff8e2ff",
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              style={{
                width: "60%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              by <span style={{ fontWeight: "600" }}>{book.author}</span>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Released: <strong>{book.releaseDate}</strong>
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={book.rating} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({book.rating}-star rating)
              </Typography>
            </Box>

            <Typography
              variant="h5"
              color="success.main"
              fontWeight="bold"
              gutterBottom
            >
              {book.price}
            </Typography>
            <Box display="flex" gap={2} mb={3}>
              <Button variant="contained" color="success">
                Add to Cart
              </Button>
              <Tooltip title="Save to Wishlist">
                <IconButton>
                  <BookmarkAddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body1" color="text.secondary">
              {book.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
 
    </>
  );
}

