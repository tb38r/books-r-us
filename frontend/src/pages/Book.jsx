import React, { useEffect, useState, useContext } from "react";
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
import { useCart } from "..//components/Book Page/CartContext";
import QuantitySelector from "../components/Book Page/QuantitySelector";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../components/Book Page/AddToCart";
import BasicRating from "../components/Book Page/RatingFeature";
import { UserContext } from "../context/UserContext";

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:4000/books")
            .then((res) => res.json())
            .then((data) => {
                const foundBook = data.find(
                    (b) =>
                        String(b.id) === String(id) ||
                        String(b.bookid) === String(id)
                );

                setBook(foundBook);
            })
            .catch((err) => console.error("Error fetching book:", err));
    }, [id]);

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
                            src={book.cover}
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
                            by{" "}
                            <span style={{ fontWeight: "600" }}>
                                {book.author}
                            </span>
                        </Typography>
                        <BasicRating />
                        {/* <Box display="flex" alignItems="center" mb={2}>
              <Rating value={book.rating} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({book.rating}-star rating)
              </Typography>
            </Box> */}

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
                                onClick={() => {
                                    if (!user) {
                                        alert(
                                            "ERROR: Please sign in to add items into your cart!"
                                        );
                                        return;
                                    }
                                    addToCart(book);
                                }}
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
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
