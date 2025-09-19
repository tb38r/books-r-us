import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddToCartButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true); // open popup instead of navigating directly
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignIn = () => {
    setOpen(false);
    navigate("/signinsignup");
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleClick}
      >
        Add to Cart
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Need to Sign In</DialogTitle>
        <DialogContent>
          You need to sign in to add items to your cart.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
