import "./Book.css";
import { Link } from "react-router-dom";


export default function Book({ cover, title, author, id }) {
    return (
        <div className="single-book-container">
            <Link to={`/book/${id}`}>
            <img
                // todo. dynamically find book cover via open library api call
                src={cover}
                alt={`${title} cover`}
                className="book-cover"
            />
            <p className="title">{title}</p>
            <p className="author">{author}</p>
            </Link>
        </div>
    );
}
