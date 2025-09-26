import React, { useEffect, useState, useContext } from "react";
import Shelf from "../components/Shelf";
import { UserContext } from "../context/UserContext";
import "../pages/Home.css";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import DraculaBanner from "../components/images/DraculaBanner.png";
import HarryPotter from "../components/images/HarryPotter.png";
import OzBanner from "../components/images/OzBanner.png";
import ArtHistory from "../components/images/ArtHistory.png";
import Sherlock from "../components/images/Sherlock.png";
export default function Home() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const { User } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        const uniqueGenres = [...new Set(data.map((book) => book.genre))];
        setGenres(uniqueGenres);
      });
  }, []);

  function formatGenre(genre) {
    const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
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
    <main className="home-wrapper">
      <Carousel books={books.slice(0, 10)} />
      {genres.map((genre) => (
        <React.Fragment key={genre}>
          <Shelf
            genre={formatGenre(genre)}
            urlGenre={genre}
            books={books.filter((b) => b.genre === genre).slice(0, 5)}
          />
          {genre === "young_adult" && (
            <Banner image={HarryPotter} alt="Harry Potter" link="/book/179" />
          )}
          {genre === "horror" && (
          <Banner image={DraculaBanner} alt="Dracula Banner" link="/book/33" />
        )}
        {genre === "fantasy" && (
          <Banner image={OzBanner} alt="Oz Banner" link='/book/47'/>
        )}
        {genre === "art_history" && (
          <Banner image={ArtHistory} alt="Art History" link='/book/118'/>
        )}
        {genre === "mystery_and_detective_stories" && (
          <Banner image={Sherlock} alt="Sherlock" link='/book/86'/>
        )}
        
        </React.Fragment>
      ))}
    </main>
  );
}
