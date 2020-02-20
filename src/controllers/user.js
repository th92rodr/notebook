const { check, validationResult } = require('express-validator');
const UserService = require('../services/user');

module.exports = {
  async store(req, res) {
    console.log('User Store');
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { name, password, email } = req.body;
      console.log('body - ', name, password, email);

      const user = await UserService.createUser(name, password, email);
      console.log('user - ', user);

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async delete(req, res) {
    console.log('User Delete');
    try {
      const { userId } = req.params;
      console.log('params - ', userId);

      const user = await UserService.deleteUser(userId);
      console.log('user - ', user);

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    console.log('User Update');
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { userId } = req.params;
      console.log('params - ', userId);

      const { name, password, email } = req.body;
      console.log('body - ', name, password, email);

      const user = await UserService.updateUser(userId, name, password, email);
      console.log('user - ', user);

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    console.log('User Login');
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { password, email } = req.body;
      console.log('body - ', password, email);

      const { token, tokenExpiration } = await UserService.login(
        email,
        password
      );
      console.log('token - ', token);
      console.log('token expiration - ', tokenExpiration);

      return res.status(200).json({ token, tokenExpiration });
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
