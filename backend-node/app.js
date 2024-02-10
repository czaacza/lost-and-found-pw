const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');

// display sample Hello World page under '/'

const app = express();
require('dotenv').config();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

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
