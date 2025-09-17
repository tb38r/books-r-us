import React, { useState, useEffect } from "react";
import Nav from "./components/nav";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import ScienceFiction from "./pages/ScienceFiction";
import Horror from "./pages/Horror";
import Historical from "./pages/Historical";
import SignInSignUp from "./pages/SignInSignUp";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";

export default function App() {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("booksRUsUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist user in localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("booksRUsUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("booksRUsUser");
    }
  }, [user]);

  return (
    <Router>
      <Nav user={user} />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Genre pages */}
        <Route path="/scifi" element={<ScienceFiction />} />
        <Route path="/horror" element={<Horror />} />
        <Route path="/historical" element={<Historical />} />

        {/* Authentication */}
        <Route
          path="/signinsignup"
          element={<SignInSignUp setUser={setUser} />}
        />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* My Account */}
        <Route
          path="/account"
          element={<MyAccount user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}
