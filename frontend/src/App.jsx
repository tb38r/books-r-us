import React from "react";
import Nav from "./components/nav";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Genre from "./pages/Genre";
import SignInSignUp from "./pages/SignInSignUp";
import Cart from "./pages/Cart";
import Book from "./pages/Book";
import MyAccount from "./pages/MyAccount";
import { UserProvider } from "./context/UserProvider";
import Footer from "./components/Footer";
import ResultsPage from "./pages/ResultsPage";
import { CartProvider } from "./components/Book Page/CartContext"; 
import SearchResults from "./components/SearchResults";

export default function App() { 
  return (
      <>
     <UserProvider>

    <CartProvider>
      <Router>
        <Nav />
        <Routes>        
          <Route path="/" element={<Home />} />  
          <Route path="/genre/:genre" element={<Genre />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signinsignup" element={<SignInSignUp />} />
          <Route path="/account" element={<MyAccount />} />

            </Routes>
        </Router>
    </CartProvider>
    </UserProvider>

    <Footer />
     </>
    );

}

