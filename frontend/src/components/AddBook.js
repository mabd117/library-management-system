import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const addBook = () => {
    axios.post('/api/books', { title, author, isbn })
      .then(response => {
        setTitle('');
        setAuthor('');
        setIsbn('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default AddBook;

