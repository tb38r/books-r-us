import React from "react";
import { useEffect, useState, useContext } from "react";
import Shelf from "../components/Shelf";
import { UserContext } from "../context/UserContext";
import "../pages/Home.css";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import AuthorBanner from "../components/images/AuthorBanner.png"


export default function Home() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const { user } = useContext(UserContext);

    const port = "8080"

    useEffect(() => {
        fetch(`http://localhost:${port}/books`)
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
  <h2 className="page-title">Welcome to Books-R-Us</h2>
        <Carousel books={books.slice(0, 10)} />
  {genres.map((genre, index) => (
    <React.Fragment key={genre}>
      <Shelf
        genre={formatGenre(genre)}
        urlGenre={genre}
        books={books.filter((b) => b.genre === genre).slice(0, 5)}
      />

      {(index + 1) % 2 === 0 && (
    <div className="banner">
      <a >
        <img src={AuthorBanner} alt="Banner" className="banner-img" />
      </a>
    </div>
      )}

      
    </React.Fragment>
  ))}
</main>
    );
}
