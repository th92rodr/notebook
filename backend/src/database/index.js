require('dotenv').config();
const mongoose = require('mongoose');

module.exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => {
      console.log('Sucessfully connected to MongoDB');
    })
    .catch(error => {
      console.error('Failed to connect to MongoDB - ', error);
    });
};
