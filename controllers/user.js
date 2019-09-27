const { check, validationResult } = require('express-validator');
const UserService = require('../services/user');

module.exports = {
  async store(req, res) {
    console.log('User Store');

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { name, password, email } = req.body;
    console.log('body - ', name, password, email);

    const user = await UserService.createUser(name, password, email);
    console.log('user - ', user);

    return res.status(200).json({ user });
  },

  async delete(req, res) {
    console.log('User Delete');

    const { userId } = req.params;
    console.log('params - ', userId);

    const user = await UserService.deleteUser(userId);
    console.log('user - ', user);

    return res.json({ user });
  },

  async update(req, res) {
    console.log('User Update');

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

    return res.json({ user });
  },

  async login(req, res) {
    console.log('User Login');

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { password, email } = req.body;
    console.log('body - ', password, email);

    const { token, tokenExpiration } = await UserService.login(email, password);
    console.log('token - ', token);
    console.log('token expiration - ', tokenExpiration);

    return res.json({ token, tokenExpiration });
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
