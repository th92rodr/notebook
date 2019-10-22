require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = {
  async createUser(name, password, email) {
    try {
      // encrypt the user's password
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
      });

      return { createdUser };
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const deletedUser = await UserModel.deleteOne({ _id: userId });

      return { deletedUser };
    } catch (error) {
      throw error;
    }
  },

  async updateUser(userId, name, password, email) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await UserModel.updateOne(
        { _id: userId },
        {
          name,
          email,
          password: hashedPassword
        }
      );

      return { updatedUser };
    } catch (error) {
      throw error;
    }
  },

  async login(email, password) {
    try {
      // get the user data in the database
      const user = await UserModel.findOne({ email: email });
      console.log('user - ', user);
      if (!user) throw new Error('User does not exists');

      // verify if the informed password is valid
      console.log('password - ', password, ' user password - ', user.password);
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Credentials are invalid');

      const token = await jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SALT,
        { expiresIn: '1h' }
      );

      return { token, tokenExpiration: 1 };
    } catch (error) {
      throw error;
    }
  }
};
