import React from "react";
import AuthorBanner from "./images/AuthorBanner.png"



export default function Banner({ image}) {
  return (
    <div className="banner">
      <a >
        <img src={AuthorBanner} alt="Banner" className="banner-img" />
      </a>
    </div>
  );
}
