import React, { useContext, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { UserContext } from "../context/UserContext";
import Book from "../components/Book";

export default function Cart() {
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchCart = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/orders/${user.id}/false`
                );
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
        try {
            const res = await fetch("http://localhost:8080/orders", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    bookId: item.id,
                    quantity: newQty,
                }),
            });

            if (res.ok) {
                setCart((prev) =>
                    prev.map((i) =>
                        i.id === item.id ? { ...i, quantity: newQty } : i
                    )
                );
            } else {
                const err = await res.json();
                alert(err.error || "Failed to update quantity");
            }
        } catch (err) {
            console.error("Update quantity error:", err);
        }
    };

    const removeFromCart = async (item) => {
        try {
            const res = await fetch(`http://localhost:8080/orders/${item.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setCart((prev) => prev.filter((i) => i.id !== item.id));
            } else {
                const err = await res.json();
                alert(err.error || "Failed to remove item");
            }
        } catch (err) {
            console.error("Remove item error:", err);
        }
    };

    const handleCheckout = async () => {
        try {
            const res = await fetch(`http://localhost:8080/orders/${user.id}`, {
                method: "PUT",
            });

            if (res.ok) {
                alert("Order purchased successfully!");
                setCart([]);
            } else {
                const err = await res.json();
                alert(err.error || "Failed to checkout");
            }
        } catch (err) {
            console.error("Checkout error:", err);
        }
    };

    if (!user)
        return <Typography>Please sign in to view your cart.</Typography>;
    if (loading) return <Typography>Loading cart...</Typography>;
    if (cart.length === 0) return <Typography>Your cart is empty.</Typography>;

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Your Cart, {user.firstName}
            </Typography>

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
                        }}
                    >
                        <Book
                            cover={item.coverUrl}
                            title={item.title}
                            author={item.author}
                            id={item.id}
                        />
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                        >
                            <Typography>
                                £{item.price.toFixed(2)} each
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
                                            Math.max(item.quantity - 1, 1)
                                        )
                                    }
                                >
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography>{item.quantity}</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        updateQuantity(item, item.quantity + 1)
                                    }
                                >
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removeFromCart(item)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box mt={3}>
                <Button
                    variant="contained"
                    color="warning"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
            </Box>
        </Box>
    );
}
