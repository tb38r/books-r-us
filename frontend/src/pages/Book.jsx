import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "..//components/Book Page/CartContext";
import { getGroqChatCompletion } from "../ai/geminiClient";
import defaultCover from "../assets/defaultcover.jpg";
import QuantitySelector from "../components/Book Page/QuantitySelector";
import { UserContext } from "../context/UserContext";

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
    if (!book?.title) return;
    const fetchAIResponse = async () => {
      try {
        const result = await getGroqChatCompletion(book?.title, book?.author);
        setAiResponse(result);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setAiResponse(error);
      }
    };

    fetchAIResponse();
  }, [book]);

  console.log("ai response", aiResponse);

  const addToCartHandler = async () => {
    if (!user) {
      setError("Please sign in to add items to your cart!");
      return;
    }

    try {
      const resCheck = await fetch(
        `http://localhost:8080/orders/${user.id}/false`
      );
      const cartData = await resCheck.json();

      const existingItem = cartData.find((i) => i.book.id === book.id);
      const inCartQty = existingItem ? existingItem.book.quantity : 0;

      const availableStock = book.quantity - inCartQty;

      if (availableStock <= 0) {
        setError("You already have all available copies in your cart.");
        return;
      }

      const qtyToAdd = Math.min(quantity, availableStock);

      if (existingItem) {
        const resUpdate = await fetch("http://localhost:8080/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
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
          bgcolor: "#e0e0e0ff",
          p: 4,
          borderRadius: 2,
          boxShadow: 8,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.coverUrl || defaultCover}
              alt={`Cover of ${book.title}`}
              style={{
                width: "90%",
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

            <Typography variant="h5" color="" fontWeight="bold" gutterBottom>
              £{book.price.toFixed(2)}{" "}
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} mb={3}>
              {book.quantity > 0 ? (
                <>
                  <Typography
                    color={book.quantity < 10 ? "warning.main" : "success.main"}
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

                  <Button
                    variant="contained"
                    color="success"
                    onClick={addToCartHandler}
                    sx={{
                      backgroundColor: "grey.500",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "grey.600",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>

                  {error && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography color="error" fontWeight="bold" variant="h6">
                  Sold Out
                </Typography>
              )}
            </Box>
            {successMsg && (
              <Typography
                color="success"
                variant="body2"
                sx={{ mt: 1, fontWeight: 500 }}
              >
                Added to cart!
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
        {aiResponse && <span style={{color:'black', width:'50%', paddingTop:'1rem'}}>{aiResponse.choices[0].message.content}</span>}
    </>
  );
}
