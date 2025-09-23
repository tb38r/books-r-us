import React from "react";
import { useEffect, useState } from "react";
import Shelf from "../components/Shelf";
import "../pages/Home.css";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                const uniqueGenres = [
                    ...new Set(data.map((book) => book.genre)),
                ];
                setGenres(uniqueGenres);
            });
    }, []);

    function formatGenre(genre) {
        const romanNumerals = [
            "i",
            "ii",
            "iii",
            "iv",
            "v",
            "vi",
            "vii",
            "viii",
            "ix",
            "x",
        ];
        return genre
            .split("_")
            .map((word) => {
                if (romanNumerals.includes(word.toLowerCase())) {
                    return word.toUpperCase();
                }
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    return (
        <main>
            <h2 className="page-title">Welcome to Books‑R‑Us</h2>
            <p></p>
            {genres.map((genre) => (
                <Shelf
                    key={genre}
                    genre={formatGenre(genre)}
                    urlGenre={genre}
                    books={books.filter((b) => b.genre === genre).slice(0, 5)}
                />
            ))}
        </main>
    );
}
