const mongoose = require('mongoose');

async function connectionDb() {
  try {
    const connectionResponse = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`connected successfully with db`);
  } catch (err) {
    console.error(`error while connection with db: ${err}`);
  }
}

module.exports = connectionDb;
