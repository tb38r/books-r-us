import React from "react";
import Shelf from "../components/Shelf";
import "../pages/Home.css";
export default function Home() {
    return (
        <main>
            <h2>Welcome to Books‑R‑Us</h2>
            <p></p>
            <Shelf />
            {/* Genre sections go here */}
        </main>
    );
}
