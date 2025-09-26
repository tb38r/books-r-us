import React, { useState } from "react";
import "./Book.css";
import defaultCover from "../assets/defaultcover.jpg";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function Book({ cover, title, author, id }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="single-book-container">
            <Link
                to={`/book/${id}`}
                style={{ position: "relative", display: "inline-block" }}
            >
                {!loaded && (
                    <Skeleton
                        variant="rectangular"
                        width={150}
                        height={220}
                        animation="wave"
                        style={{ borderRadius: "8px" }}
                    />
                )}

                <img
                    src={cover || defaultCover}
                    alt={`${title} cover`}
                    className="book-cover fade-image"
                    style={{
                        opacity: loaded ? 1 : 0,
                        position: loaded ? "static" : "absolute",
                        top: 0,
                        left: 0,
                        width: 150,
                        height: 220,
                        borderRadius: "8px",
                    }}
                    onLoad={() => setLoaded(true)}
                />

                <p className="title">{title}</p>
                <p className="author">{author}</p>
            </Link>
        </div>
    );
}
