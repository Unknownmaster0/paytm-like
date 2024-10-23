const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// cors policy
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://localhost:5173',
      'https://d1ydowo8p03tv9.cloudfront.net',
    ],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// here we will use the middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// import routes
const { router: mainRouter } = require('./routes/main.routes');
// declare routes
app.use('/api/v1', mainRouter);

module.exports = {
  app,
};
