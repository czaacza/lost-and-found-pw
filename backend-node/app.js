const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');

// display sample Hello World page under '/'

const app = express();
require('dotenv').config();

// middlewares
app.use(express.json());
app.use(cors());

// routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require(`./routes/${route}`))
);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

module.exports = app;
