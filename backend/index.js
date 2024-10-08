require('dotenv').config();
const connectionDb = require('./db');
const port = process.env.PORT || 8000;
const { app } = require('./app');

connectionDb()
  .then(() => {
    app.listen(port);
    console.log(`Server is listening on port: ${port}`);
  })
  .catch((err) => {
    console.error(`error while connection with db in index.js ${err}`);
  });

module.exports = { app };
