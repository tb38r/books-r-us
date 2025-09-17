import React from "react";
import Nav from "./components/Nav";
//import Homepage from "./Homepage";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import SignInSignUp from "./pages/SignInSignUp";
import Cart from "./pages/Cart";
import Book from "./pages/Book";
import MyAccount from "./pages/MyAccount";

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

    return (
        <Router>
            <Nav />
            <Routes>
                {/* Homepage */}
                <Route path="/" element={<Home />} />

                {/* Genre pages */}
                <Route path="/genre/:genre" element={<Genre />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/book/:bookID" element={<Book />} />
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
    );
}
