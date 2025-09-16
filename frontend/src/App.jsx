import React from "react";
import Nav from "./components/nav";
//import Homepage from "./Homepage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ScienceFiction from "./pages/ScienceFiction";
import Fantasy from "./pages/Fantasy";
import Romance from "./pages/Romance";
import Mystery from "./pages/Mystery";
import Thriller from "./pages/Thriller";
import Horror from "./pages/Horror";
import Historical from "./pages/Historical";
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
        <Route path="/scifi" element={<ScienceFiction />} />
        <Route path="/fantasy" element={<Fantasy />} />
        <Route path="/romance" element={<Romance />} />
        <Route path="/mystery" element={<Mystery />} />
        <Route path="/thriller" element={<Thriller />} />
        <Route path="/horror" element={<Horror />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}


