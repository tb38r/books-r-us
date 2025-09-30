import Book from "../components/Book";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import "./Genre.css";

export default function Genre() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const { genre } = useParams();

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
        <div className="genre-page-container">
            <h2 className="genretitle">{formatGenre(genre)}</h2>
            <div className="genre-books-container">
                {books
                    .filter((book) => book.genre === genre)
                    .map((book) => (
                        <Book
                            key={book.id}
                            cover={book.coverUrl}
                            title={book.title}
                            author={book.author}
                            id={book.id}
                        />
                    ))}
            </div>
        </div>
    );
}
