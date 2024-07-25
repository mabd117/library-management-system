const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/books', booksRouter);

app.listen(3000, () => console.log('Backend listening on port 3000'));

