import { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
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


  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        onClick={handleDecrease}
        disabled={quantity <= min}
        size="small"
      >
        <Remove fontSize="small"  />
      </IconButton>

      {/* <TextField
        value={quantity}
        // onChange={handleInputChange}
        type="number"
        size="small"
        inputProps={{ min, max, style: { textAlign: "center", width: "50px" } }}
      /> */}

          <Typography 
          variant="body2" 
          sx={{ minWidth: "20px", textAlign: "center" }}>
        {quantity}
      </Typography>
      
      <IconButton
        onClick={handleIncrease}
        disabled={quantity >= max}
        size="small"
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
}
