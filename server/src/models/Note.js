const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    // with the timestamps set as true, mongoose will automatically
    // create the columns `createdAt` and `updatedAt` in the database
    // for every entry of the schema
    timestamps: true
  }
);

module.exports = model('note', noteSchema);
