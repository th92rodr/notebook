require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = {

    async createUser(name, password, email) {
        // encrypt the user's password
        const hashedPassword = await bcrypt.hash(password, 1234);

        const createdUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        return { createdUser };
    },

    async deleteUser(userId) {
        await UserModel.deleteOne({ _id: userId });
    },

    async updateUser(userId, name, password, email) {
        const updatedUser = await UserModel.updateOne(
            { _id: userId }, 
            { name, email, password }
        );

        return { updatedUser };
    },

    async login(email, password) {
        // get the user data in the database
        const user = await UserModel.findOne({ email: email });
        if (!user) throw new Error('User does not exists');

        // verify if the informed password is valid
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Credentials are invalid');

        const token = await jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SALT,
            { expiresIn: '1h' }
        );

        return { token, tokenExpiration: 1 };
    },

};