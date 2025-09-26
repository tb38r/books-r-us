import React from "react";
import "./Banner.css";
import { Link } from "react-router-dom";

export default function Banner({ image, alt, link }) {
  return (
    <div className="banner-wrapper">
      <Link to={link}>
        <img src={image} alt={alt} className="banner-image" />
      </Link>
    </div>
  );
}

