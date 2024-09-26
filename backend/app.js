const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// here we will use the middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// cors policy
app.use(
  cors({
    origin: 'https://localhost:5173',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// import routes
const { router: mainRouter } = require('./routes/main.routes');
// declare routes
app.use('/api/v1', mainRouter);

module.exports = {
  app,
};
