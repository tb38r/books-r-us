import React, { useContext } from "react";
import { useCart } from "../components/Book Page/CartContext";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import { UserContext } from "../context/UserContext";

export default function Cart() {
    const { cart, removeFromCart } = useCart();
    const { user } = useContext(UserContext);
    if (cart.length === 0) {
        return <Typography>Your cart is empty.</Typography>;
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Your Cart {user.firstName} {user.LastName}
            </Typography>
            <List>
                {cart.map((item) => (
                    <ListItem
                        key={item.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <Typography>
                            {item.title} (x{item.quantity})
                        </Typography>
                        <Button
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
