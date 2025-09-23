import "./Book.css";
import defaultCover from "../assets/defaultcover.jpg";
import { Link } from "react-router-dom";

export default function Book({ cover, title, author, id }) {
    return (
        <div className="single-book-container">
            <Link to={`/book/${id}`}>
                <img
                    src={cover || defaultCover}
                    alt={`${title} cover`}
                    className="book-cover"
                />
                <p className="title">{title}</p>
                <p className="author">{author}</p>
            </Link>
        </div>
    );
}
