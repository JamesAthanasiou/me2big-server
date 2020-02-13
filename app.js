require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require ('./models');

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log('Server has started');
});