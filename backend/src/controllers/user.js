require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const UserModel = require('../models/User');

module.exports = {
  async store(req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
      });

      return res.status(200).json({ createdUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { userId } = req.params;
      await UserModel.findByIdAndDelete(userId);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { userId } = req.params;
      const { name, password, email } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.findByIdAndUpdate(userId, {
        name,
        email,
        password: hashedPassword
      });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (!user) throw new Error('User does not exists');

      // Verify if the informed password is valid
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Credentials are invalid');

      const token = await jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SALT,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token, tokenExpiration: 1 });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  validate: function validate(method) {
    switch (method) {
      case 'store':
      case 'update':
        return [
          check('name', 'Name does not exists').exists(),
          check('email', 'Email is invalid or does not exists')
            .exists()
            .isEmail(),
          check('password', 'Password is invalid or does not exists')
            .exists()
            .isLength({ min: 8 })
        ];
      case 'login':
        return [
          check('email', 'Email is invalid or does not exists')
            .exists()
            .isEmail(),
          check('password', 'Password is invalid or does not exists')
            .exists()
            .isLength({ min: 8 })
        ];
    }
  }
};
