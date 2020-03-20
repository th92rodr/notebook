require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

module.exports = {
  /**
   * Creates a new user
   * @param {String} name 
   * @param {String} password 
   * @param {String} email 
   */
  async createUser(name, password, email) {
    try {
      // Encrypt the user's password
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

  /**
   * Deletes a given user
   * @param {ID} userId 
   */
  async deleteUser(userId) {
    try {
      const deletedUser = await UserModel.deleteOne({ _id: userId });

      return { deletedUser };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Updates a given user
   * @param {ID} userId 
   * @param {String} name 
   * @param {String} password 
   * @param {String} email 
   */
  async updateUser(userId, name, password, email) {
    try {
      // Encrypt the user's password
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

  /**
   * Perform user login
   * @param {String} email 
   * @param {String} password 
   */
  async login(email, password) {
    try {
      // Get the user data in the database
      const user = await UserModel.findOne({ email: email });
      if (!user) throw new Error('User does not exists');

      // Verify if the informed password is valid
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Credentials are invalid');

      // Creates a new token valid for 1 hour
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
