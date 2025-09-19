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
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/book/:bookID" element={<Book />} />
          <Route path="/results/:searchId" element={<ResultsPage />} />
          <Route path="/signinsignup" element={<SignInSignUp />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
            </Routes>
        </Router>
    </CartProvider>
    </UserProvider>

    <Footer />
     </>
    );

}

