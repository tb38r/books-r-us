import React, { useContext, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { UserContext } from "../context/UserContext";
import Book from "../components/Book";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [openBanner, setOpenBanner] = useState(false);

    useEffect(() => {
        if (!user || !user.sub) return;

        const fetchCart = async () => {
            console.log("Fetching cart for user:", user.sub);
            try {
                const res = await fetch(`http://localhost:8080/orders/false`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                console.log("Fetch response:", res);
                if (!res.ok) throw new Error("Failed to fetch cart");
                const data = await res.json();
                setCart(data);
            } catch (err) {
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user]);

    const updateQuantity = async (item, newQty) => {
        if (newQty < 1) return;
        setErrors((prev) => ({ ...prev, [item.id]: "" }));

        try {
            const res = await fetch("http://localhost:8080/orders", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    userId: user.sub,
                    bookId: item.book.id,
                    quantity: newQty,
                }),
            });

            if (res.ok) {
                setCart((prev) =>
                    prev.map((i) =>
                        i.id === item.id
                            ? { ...i, book: { ...i.book, quantity: newQty } }
                            : i
                    )
                );
            } else {
                const errData = await res.json();
                const displayMessage = errData.error
                    ?.toLowerCase()
                    .includes("quantity")
                    ? `Cannot add more copies of this book.`
                    : errData.error || "Failed to update quantity";

                setErrors((prev) => ({
                    ...prev,
                    [item.id]: displayMessage,
                }));
            }
        } catch (err) {
            console.error("Update quantity error:", err);
            setErrors((prev) => ({
                ...prev,
                [item.id]: "Failed to update quantity. Try again.",
            }));
        }
    };

    const removeFromCart = async (item) => {
        console.log("attempting to remove item", item);
        try {
            const res = await fetch(`http://localhost:8080/orders/${item.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (res.ok) {
                setCart((prev) => prev.filter((i) => i.id !== item.id));
                setCheckoutMessage("Item removed from cart");
                setCheckoutSuccess(true);
                setOpenBanner(true);
            } else {
                const err = await res.json();
                setCheckoutMessage(err.error || "Failed to remove item");
                setCheckoutSuccess(false);
                setOpenBanner(true);
            }
        } catch (err) {
            console.error("Remove item error:", err);
        }
    };

    const handleCheckout = async () => {
        try {
            const res = await fetch(`http://localhost:8080/orders/purchase`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (res.ok) {
                setCart([]);
                setCheckoutMessage("Order purchased successfully!");
                setCheckoutSuccess(true);
                setOpenBanner(true);
                navigate("/account");
            } else {
                const err = await res.json();
                setCheckoutMessage(err.error || "Failed to checkout");
                setCheckoutSuccess(false);
                setOpenBanner(true);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            setCheckoutMessage("Failed to checkout");
            setCheckoutSuccess(false);
            setOpenBanner(true);
        }
    };

    return (
        <>
            <Snackbar
                open={openBanner}
                autoHideDuration={3000}
                onClose={() => setOpenBanner(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenBanner(false)}
                    severity={checkoutSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {checkoutMessage}
                </Alert>
            </Snackbar>

            {!user ? (
                <Typography>Please sign in to view your cart.</Typography>
            ) : loading ? (
                <Typography>Loading cart...</Typography>
            ) : cart.length === 0 ? (
                <Box
                    sx={{
                        height: "70vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" color="text.secondary">
                        Your cart is empty.
                    </Typography>
                </Box>
            ) : (
                <Box p={4}>
                    <Typography variant="h4" gutterBottom>
                        Your Cart, {user.firstName}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 6,
                            px: 4,
                            mt: 4,
                            height: "70vh",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                pr: 4,
                                borderRight:
                                    cart.length > 0 ? "1px solid #ddd" : "none",
                            }}
                        >
                            <List>
                                {cart.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            borderBottom: "1px solid #ddd",
                                            py: 2,
                                            gap: 6,
                                        }}
                                    >
                                        <Book
                                            cover={item.book.coverUrl}
                                            title={item.book.title}
                                            author={item.book.author}
                                            id={item.book.id}
                                        />

                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="flex-start"
                                        >
                                            <Typography>
                                                £{item.book.price.toFixed(2)}{" "}
                                                each
                                            </Typography>

                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={1}
                                                my={1}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            Math.max(
                                                                item.book
                                                                    .quantity -
                                                                    1,
                                                                1
                                                            )
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>

                                                <Typography>
                                                    {item.book.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.book.quantity +
                                                                1
                                                        )
                                                    }
                                                >
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            {errors[item.id] && (
                                                <Typography
                                                    variant="body2"
                                                    color="error"
                                                    sx={{
                                                        mt: 1,
                                                        fontSize: "0.85rem",
                                                        textAlign: "center",
                                                        maxWidth: "90px",
                                                        mb: 2,
                                                    }}
                                                >
                                                    {errors[item.id]}
                                                </Typography>
                                            )}

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() =>
                                                    removeFromCart(item)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box
                            sx={{
                                width: "250px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "end",
                                height: "70vh",
                                pl: 6,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<ShoppingCartCheckoutIcon />}
                                onClick={handleCheckout}
                                sx={{ width: "100%" }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
