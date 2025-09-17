import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import SignInSignUp from "./pages/SignInSignUp";
import Cart from "./pages/Cart";
import Book from "./pages/Book";
import MyAccount from "./pages/MyAccount";
import { UserProvider } from "./context/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/signinsignup" element={<SignInSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:bookID" element={<Book />} />
        <Route path="/account" element={<MyAccount />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}
