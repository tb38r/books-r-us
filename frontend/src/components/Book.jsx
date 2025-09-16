import "./Book.css";

export default function Book({ cover, title, author }) {
    return (
        <div className="single-book-container">
            <img
                // todo. dynamically find book cover via open library api call
                src={cover}
                alt={`${title} cover`}
                className="book-cover"
            />
            <p className="title">{title}</p>
            <p className="author">{author}</p>
        </div>
    );
}
