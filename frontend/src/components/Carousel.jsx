import React, { useState, useEffect } from "react";
import Horror from "./images/Horror.png";
import ScienceFiction from "./images/ScienceFiction.png";
import Fantasy from "./images/Fantasy.png";
import Romance from "./images/Romance.png";
import "./Carousel.css";
import { Link } from "react-router-dom";


export default function Carousel() {
const images = [
  { src: Fantasy, alt: "Fantasy", link: "genre/fantasy" },
  { src: Horror, alt: "Horror", link: "genre/horror" },
  { src: ScienceFiction, alt: "Science Fiction", link: "genre/science_fiction" },
  { src: Romance, alt: "Romance", link: "genre/romance" },
];


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <div className="carousel-wrapper">
    <div className="carousel-image-container">
      <Link to={currentImage.link}>
        <img src={currentImage.src} alt={currentImage.alt} className="carousel-image" />
      </Link>
    </div>
  </div>
  );
}

