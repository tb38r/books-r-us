import React, { useContext } from "react";
import { useCart} from "../components/Book Page/CartContext";
import { Box, Typography, Button, List, ListItem, IconButton } from "@mui/material";
import { UserContext } from "../context/UserContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useContext(UserContext);

  if (cart.length === 0) {
    return <Typography>Your cart is empty.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Your Cart  {user.firstName}
      </Typography>

      <List>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography>{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                £0 each
              </Typography>
            </Box>

              <IconButton
                size="small"
                onClick={() =>
                  updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                }
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <AddIcon fontSize="small" />
              </IconButton>

            <Button
              onClick={() => removeFromCart(item.id)}
              sx={{ color: "red", textTransform: "uppercase" }}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>

      <Box mt={3}>
        <Button
          variant="outlined"
          color="warning"
          startIcon={<ShoppingCartCheckoutIcon />}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
