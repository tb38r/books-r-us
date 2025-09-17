import React from "react";
import Nav from "./components/Nav";
//import Homepage from "./Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import SignIn from "./pages/SignIn";
import Cart from "./pages/Cart";

export default function App() {
    return (
        <Router>
            <Nav />
            <Routes>
                {/* Homepage */}
                <Route path="/" element={<Home />} />

                {/* Genre pages */}
                <Route path="/:genre" element={<Genre />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}
