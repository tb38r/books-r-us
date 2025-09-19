import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function QuantitySelector({ min = 1, max = 99, onChange }) {
  const [quantity, setQuantity] = useState(min);

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = min;
    if (value < min) value = min;
    if (value > max) value = max;
    setQuantity(value);
    onChange?.(value);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handleDecrease}
        disabled={quantity <= min}
        size="small"
      >
        <Remove />
      </IconButton>

      <TextField
        value={quantity}
        onChange={handleInputChange}
        type="number"
        size="small"
        inputProps={{ min, max, style: { textAlign: "center", width: "50px" } }}
      />

      <IconButton
        onClick={handleIncrease}
        disabled={quantity >= max}
        size="small"
      >
        <Add />
      </IconButton>
    </Box>
  );
}
