const mongoose = require('mongoose');

let databaseURL;
if ((process.env.NODE_ENV = 'test')) {
  databaseURL = process.env.TEST_DATABASE;
} else {
  databaseURL = process.env.DATABASE;
}

module.exports.connect = () => {
  mongoose
    .connect(databaseURL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Sucessfully connected to MongoDB');
    })
    .catch(error => {
      console.error('Failed to connect to MongoDB - ', error);
    });
};
