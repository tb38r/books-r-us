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
import defaultCover from "../assets/defaultcover.jpg";
import { getGroqChatCompletion } from "../ai/geminiClient";

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useContext(UserContext);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const [aiResponse, setAiResponse] = useState(null);
    const [incart, setIncart] = useState([]);
    const isInCart = book && cart.some((item) => item.book.id === book.id);

    useEffect(() => {
        fetch(`http://localhost:8080/books`)
            .then((res) => res.json())
            .then((data) => {
                const foundBook = data.find((b) => b.id === parseInt(id));
                setBook(foundBook);
            })
            .catch((err) => console.error("Error fetching book:", err));
    }, [id]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`http://localhost:8080/orders/false`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setCart(data);
                    const bookIds = data.map((item) => item.book.id);
                    setIncart(bookIds);
                    console.log("Book IDs in cart:", bookIds);
                } else {
                    console.error("Failed to fetch cart");
                }
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        if (!book?.title) return;
        const fetchAIResponse = async () => {
            try {
                const result = await getGroqChatCompletion(
                    book?.title,
                    book?.author
                );
                setAiResponse(result);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setAiResponse(error);
            }
        };

        fetchAIResponse();
    }, [book]);

    const addToCartHandler = async () => {
        if (!user) {
            setError("Please sign in to add items to your cart!");
            return;
        }

        try {
            const resCheck = await fetch(`http://localhost:8080/orders/false`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!resCheck.ok) {
                setError("Failed to fetch cart");
                return;
            }

            const cartData = await resCheck.json();

            const existingItem = cartData.find((i) => i.bookId === book.id);
            const inCartQty = existingItem ? existingItem.quantity : 0;

            const availableStock = book.quantity - inCartQty;
            if (availableStock <= 0) {
                setError("You already have all available copies in your cart.");
                return;
            }

            const qtyToAdd = Math.min(quantity, availableStock);

            if (existingItem) {
                const resUpdate = await fetch("http://localhost:8080/orders", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        bookId: book.id,
                        quantity: inCartQty + qtyToAdd,
                    }),
                });

                if (!resUpdate.ok) {
                    const errData = await resUpdate.json();
                    setError(errData.error || "Failed to update quantity");
                    return;
                }
            } else {
                const resPost = await fetch("http://localhost:8080/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        bookId: book.id,
                        quantity: qtyToAdd,
                    }),
                });

                if (!resPost.ok) {
                    const errData = await resPost.json();
                    setError(errData.error || "Failed to add to cart");
                    return;
                }
            }

            setCart((prev) => {
                if (!existingItem) {
                    return [
                        ...prev,
                        { book, bookId: book.id, quantity: qtyToAdd },
                    ];
                } else {
                    return prev.map((item) =>
                        item.bookId === book.id
                            ? { ...item, quantity: inCartQty + qtyToAdd }
                            : item
                    );
                }
            });

            setError("");
            setSuccessMsg(true);
            setTimeout(() => setSuccessMsg(false), 2000);
        } catch (err) {
            console.error("Add to cart error:", err);
            setError("Failed to add book to cart.");
        }
    };

    if (!book) {
        return <Typography>Loading book details...</Typography>;
    }

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

    return (
        <>
            <Breadcrumbs separator="›" sx={{ mb: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href={`/genre/${book.genre}`}
                >
                    {formatGenre(book.genre)} Books
                </Link>
                <Typography color="text.primary">{book.title}</Typography>
            </Breadcrumbs>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    px: 2,
                    mt: 6,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#e0e0e0",
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 4,
                        maxWidth: "800px",
                        width: "100%",
                        display: "flex",
                        gap: "2rem",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "flex-start",
                        backgroundColor: "#f9f4f4",
                    }}
                >
                    <Box
                        sx={{
                            flexShrink: 0,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={book.coverUrl || defaultCover}
                            alt={`Cover of ${book.title}`}
                            style={{
                                width: "180px",
                                height: "270px",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            flexGrow: 1,
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                            }}
                        >
                            {book.title}
                        </Typography>
                        <Typography variant="h6">
                            by{" "}
                            <span style={{ fontWeight: "600" }}>
                                {book.author}
                            </span>
                        </Typography>

                        <Typography variant="h5" fontWeight="bold">
                            £{book.price.toFixed(2)}
                        </Typography>

                        {book.quantity > 0 ? (
                            <>
                                <Typography
                                    color={
                                        book.quantity < 10
                                            ? "warning.main"
                                            : "success.main"
                                    }
                                    variant="body2"
                                    fontWeight="500"
                                >
                                    {book.quantity < 10
                                        ? book.quantity === 1
                                            ? "Only 1 left!"
                                            : `Only ${book.quantity} left!`
                                        : `In Stock: ${book.quantity} copies`}
                                </Typography>

                                <QuantitySelector
                                    min={1}
                                    max={Math.min(book.quantity, 99)}
                                    onChange={(val) => setQuantity(val)}
                                />

                                {cart.some(
                                    (item) => item.book.id === book.id
                                ) ? (
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => navigate("/cart")}
                                        sx={{
                                            textTransform: "capitalize",
                                            fontSize: "0.8rem",
                                            padding: "4px 10px",
                                            borderRadius: "6px",
                                            width: "120px",
                                            mt: 1,
                                            "&:hover": {
                                                backgroundColor: "info.dark",
                                            },
                                        }}
                                    >
                                        In Basket
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            if (isInCart) {
                                                navigate("/cart");
                                            } else {
                                                addToCartHandler();
                                            }
                                        }}
                                        sx={{
                                            textTransform: "capitalize",
                                            fontSize: "0.8rem",
                                            padding: "4px 10px",
                                            borderRadius: "6px",
                                            width: "120px",
                                            mt: 1,
                                            background: "#3c1a6e",
                                        }}
                                    >
                                        {isInCart ? "In Basket" : "Add to Cart"}
                                    </Button>
                                )}

                                {error && (
                                    <Typography
                                        color="error"
                                        variant="body2"
                                        sx={{ mt: 1 }}
                                    >
                                        {error}
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <Typography
                                color="error"
                                fontWeight="bold"
                                variant="h6"
                            >
                                Sold Out
                            </Typography>
                        )}

                        {successMsg && (
                            <Typography
                                color="success"
                                variant="body2"
                                sx={{ mt: 1, fontWeight: 500 }}
                            >
                                Added to cart!
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            {aiResponse?.choices?.[0]?.message?.content && (
                <Box
                    sx={{
                        mt: 4,
                        width: { xs: "100%", md: "50%" },
                        p: 2,
                        bgcolor: "#e7e7e7ff",
                        borderRadius: 2,
                        position: "relative",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            position: "absolute",
                            top: -18,
                            left: 0,
                            px: 1.5,
                            backgroundColor: "#e7e7e7ff",
                            borderRadius: "6px 6px 0 0",
                            fontWeight: "bold",
                            fontSize: "1rem",
                        }}
                    >
                        Book Description
                    </Typography>

                    <Typography color="text.primary">
                        {aiResponse.choices[0].message.content}
                    </Typography>
                </Box>
            )}
        </>
    );
}
