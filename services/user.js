const bcrypt = require('bcryptjs');
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

};