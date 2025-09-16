import { useEffect } from "react";
import "./Shelf.css";
import Button from "@mui/material/Button";

export default function Shelf() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    return (
        <div className="shelf-container">
            <div className="title-button-container">
                <h1>Genre Title</h1>
                <Button
                    // component={Link}
                    // to="/signin"
                    variant="outlined"
                    className="sign-in-button"
                    sx={{
                        "&:hover": {
                            backgroundColor: "rgba(234, 88, 12, 0.1)",
                            border: "1px solid rgb(234 88 12)",
                        },
                        color: "rgb(234 88 12)",
                        border: "1px solid rgb(234 88 12)",
                        textTransform: "none",
                        borderRadius: "8px",
                        fontWeight: 500,
                        height: "32px",
                        padding: "0 12px",
                    }}
                >
                    See More
                </Button>
            </div>

            <div className="all-books-container">
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
                <div className="single-book-container">
                    <img
                        src="https://i.ebayimg.com/images/g/JRAAAOSwGihfalVv/s-l1200.jpg"
                        alt="A Book Cover"
                        className="book-cover"
                    />
                    <p className="title">Title</p>
                    <p className="author">Author</p>
                </div>
            </div>
        </div>
    );
}
