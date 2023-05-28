import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState();
  const [genre, setGenre] = useState();
  const [authorId, setAuthorId] = useState();

  const [addBook] = useMutation(addBookMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  const { loading: authorsloading, data } = useQuery(getAuthorsQuery);
  if (authorsloading) return <p>Loading Books...</p>;

  console.log(data);

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option hidden>Select author</option>
          {data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
