import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import SignInSignUp from "./pages/SignInSignUp";
import Cart from "./pages/Cart";
import Book from "./pages/Book";
import MyAccount from "./pages/MyAccount";
import Footer from "./components/Footer";
import ResultsPage from "./pages/ResultsPage";
import { CartProvider } from "./components/Book Page/CartContext"; 

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("booksRUsUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("booksRUsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("booksRUsUser");
    }
  }, [user]);

  return (<>
    <CartProvider>
      <Router>
        <Nav />
        <Routes>
         
          <Route path="/" element={<Home />} />

          
          <Route path="/genre/:genre" element={<Genre />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book/:bookID" element={<Book />} />
          <Route path="/results/:searchId" element={<ResultsPage />} />

          <Route
            path="/signinsignup"
            element={<SignInSignUp setUser={setUser} />}
          />
          <Route
            path="/account"
            element={<MyAccount user={user} setUser={setUser} />}
          />
        </Routes>
        
      </Router>
      
    </CartProvider>
    <Footer />
    </>
  );
}
