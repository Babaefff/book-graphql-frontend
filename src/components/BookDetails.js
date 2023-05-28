import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  const { data, loading } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });
  console.log(loading);
  let display;
  if (loading)
    return (
      <div>
        <ul id="book-details">Loadingg...</ul>
      </div>
    );

  const book = data?.book;
  if (book) {
    display = (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className="other-books">
          {book.author.books.map((authorbook) => {
            return <li key={authorbook.id}>{authorbook.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    display = <div>No book selected</div>;
  }

  return (
    <div>
      <ul id="book-details">{display}</ul>
    </div>
  );
};

export default BookDetails;
