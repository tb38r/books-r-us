import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import { Twitter, Instagram } from "@mui/icons-material";
import "./Footer.css"; 

export default function Footer() {
  return (
    <Box component="footer" className="footer">
      <Typography variant="h6" gutterBottom className="footer-title">
        Books-R-Us
      </Typography>

      <Stack direction="row" spacing={3} justifyContent="center" className="footer-links">
        <Link href="/" underline="hover" color="inherit">
          Home
        </Link>
        <Link href="/about" underline="hover" color="inherit">
          About
        </Link>
        <Link href="/contact" underline="hover" color="inherit">
          Contact
        </Link>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" className="footer-socials">
       
        <IconButton href="https://twitter.com" target="_blank" rel="noopener" color="inherit">
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" rel="noopener" color="inherit">
          <Instagram />
        </IconButton>
      </Stack>

      <Typography variant="body2" className="footer-copy">
        © {new Date().getFullYear()} Books-R-Us. All rights reserved.
      </Typography>
    </Box>
  );
}
