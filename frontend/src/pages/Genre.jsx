import Book from "../components/Book";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import "./Genre.css"



export default function Genre() {


    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const {genre} = useParams();

    useEffect(() => {
        fetch("http://localhost:4000/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                const uniqueGenres = [
                    ...new Set(data.map((book) => book.genre)),
                ];
                setGenres(uniqueGenres);
            });
    }, []);

    return (<div className="genre-page-container">
        <h2>{genre}</h2>
    <div className="genre-books-container">

    {books
  .filter((book) => book.genre === genre)
  .map((book) => (
    <Book
      key={book.id}
      cover={book.cover}
      title={book.title}
      author={book.author}
      id={book.id}
    />
  ))}

</div>
</div>
);
}