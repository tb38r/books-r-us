import React, { useState, useEffect } from "react";
import NatureBooks from "./images/NatureBooks.png";
import AuthorBanner from "./images/AuthorBanner.png";
import BooksOfMonth from "./images/BookOfMonthBanner.png";
import ExampleCarouselImage from "./images/ExampleCarouselImage.jpg";

export default function Carousel() {
  const images = [
    { src: NatureBooks, alt: "Nature Books" },
    { src: AuthorBanner, alt: "Author Banner" },
    { src: BooksOfMonth, alt: "Books of the Month" },
    { src: ExampleCarouselImage, alt: "Example Carousel" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentIndex];

  return (
    <div className="slideshow flex flex-col items-center">
      <div className="slideshow-item transition-all duration-700 ease-in-out">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="w-full h-[400px] object-cover"
        />
        <p className="mt-2 text-lg font-medium">{currentImage.alt}</p>
      </div>
    </div>
  );
}
