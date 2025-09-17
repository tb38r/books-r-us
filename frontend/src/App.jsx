import React from "react";
import Nav from "./components/Nav";
//import Homepage from "./Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";
import Book from "./pages/Book";

export default function App() {

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
            </Routes>
        </Router>
    );

}
