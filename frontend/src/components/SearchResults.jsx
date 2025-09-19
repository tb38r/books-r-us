import React from "react";
import { useLocation } from "react-router-dom";
import books from "../../testdb.json" ;
import { useEffect, useState } from "react";
import { TextField, Card, CardContent, Typography, Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";
  const navigate = useNavigate();


  const filtered = books.bookDB.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        Search results for: "{query}"
      </h2>

      {filtered.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((book) => (
           <Card key={book.id || book.bookid} className="shadow-md rounded-2xl">
                           <CardActionArea onClick={() => navigate(`/book/:id`)}>
              <CardContent>
                <Grid item xs={12} md={4}>
            <img
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              style={{
                width: "10%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Grid>
                <Typography variant="h6" className="font-bold">
                  {book.title}
                </Typography>
                <Typography color="textSecondary">
                  {book.author}
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            {query ? "No results found." : "Start typing to search for books."}
          </Typography>
        )}
      </div>


        // <ul className="mt-4 space-y-2">
        //   {filtered.map((book) => (
        //     <li key={book.id} className="border p-2 rounded">
        //       <h3 className="font-semibold">{book.title}</h3>
        //       <p>by {book.author}</p>
        //     </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
}
