const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { 
        type: String,
        // remove any white spaces from the user input
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
},
{
    // with the timestamps set as true, mongoose will automatically
    // create the columns `createdAt` and `updatedAt` in the database
    // for every entry of the schema
    timestamps: true
}
);

module.exports = model('user', userSchema);