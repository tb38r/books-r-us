import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Rating,
  Grid,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useCart } from "..//components/Book Page/CartContext"; // ⬅️ import
import QuantitySelector from "../components/Book Page/QuantitySelector";

export default function Book() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [cart, setCart] = useState([]);
    const { addToCart } = useCart(); 


  useEffect(() => {
    fetch("http://localhost:1800/books")
      .then((res) => res.json())
      .then((data) => {
        const foundBook = data.find(
          (b) => String(b.id) === String(bookId) || String(b.bookid) === String(bookId)
        );
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
              <Button
                variant="contained"
                color="success"
                onClick={() => addToCart(book)} 
              >
                Add to Cart
              </Button>
              <Tooltip title="Save to Wishlist">
                <IconButton>
                  <BookmarkAddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <QuantitySelector />

            <Typography variant="body1" color="text.secondary">
              {book.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
