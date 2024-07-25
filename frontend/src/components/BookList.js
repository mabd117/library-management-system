import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <ul>
      {books.map(book => (
        <li key={book._id}>{book.title} by {book.author} (ISBN: {book.isbn})</li>
      ))}
    </ul>
  );
}

export default BookList;

