import React from "react";
import Nav from "./components/Nav";
//import Homepage from "./Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScienceFiction from "./pages/ScienceFiction";
import Fantasy from "./pages/Fantasy";
import Romance from "./pages/Romance";
import Mystery from "./pages/Mystery";
import Thriller from "./pages/Thriller";
import Horror from "./pages/Horror";
import Historical from "./pages/Historical";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Book from "./pages/Book";

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genre" element={<ScienceFiction />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:bookID" element={<Book />} />

      </Routes>
    </Router>
  );
}


