require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const UserModel = require('../models/User');
const { authControlRedis } = require('../redis/');

const tokenList = {};

module.exports = {
  async store(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: 'Invalid input', errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.create({
        name,
        email,
        password: hashedPassword
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({ message: 'User created sucessfully' });
  },

  async delete(req, res) {
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { userId } = req.params;

    if (req.userId !== userId) {
      return res
        .status(401)
        .json({ message: 'User is not authorized to perform this action' });
    }

    const { isValid, errorMessage } = await checkTokenValidation(
      userId,
      req.token
    );
    if (!isValid) {
      return res.status(401).json({ message: errorMessage });
    }

    try {
      await UserModel.findByIdAndDelete(userId);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ message: 'User deleted sucessfully' });
  },

  async update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: 'Invalid input', errors: errors.array() });
    }

    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { userId } = req.params;

    if (req.userId !== userId) {
      return res
        .status(401)
        .json({ message: 'User is not authorized to perform this action' });
    }

    const { isValid, errorMessage } = await checkTokenValidation(
      userId,
      req.token
    );
    if (!isValid) {
      return res.status(401).json({ message: errorMessage });
    }

    const { name, password, email } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.findByIdAndUpdate(userId, {
        name,
        email,
        password: hashedPassword
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(200).json({ message: 'User updated sucessfully' });
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: 'Invalid input', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exists' });
      }

      // Verify if the informed password is valid
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      let date = new Date();

      const token = await jwt.sign(
        { id: user.id, date: date },
        process.env.SALT,
        { expiresIn: '1h' }
      );

      date.setHours(date.getHours() + 1);
      /*
      tokenList[token] = {
        user: user.id,
        expiration: date
      };
      */

      await setAsync(
        user.id,
        JSON.stringify({
          token: token,
          expiration: date
        })
      );

      return res.status(200).json({ token, tokenExpiration: 1 });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async refreshToken(req, res) {
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const oldToken = req.token;
    console.log('old token', oldToken);
    console.log('old token user ', req.userId);

    const { user } = req.body;

    if (user !== req.userId) {
      console.log('not same user');
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { isValid, errorMessage } = await checkTokenValidation(
      user,
      oldToken
    );
    if (!isValid) {
      return res.status(401).json({ message: errorMessage });
    }

    /*
    if (!(oldToken in tokenList)) {
      console.log('not in list');
      return res.status(401).json({ message: 'Invalid token' });
    }
    delete tokenList.oldToken;
    */

    let date = new Date();

    try {
      const newToken = await jwt.sign(
        { id: user, date: date },
        process.env.SALT,
        { expiresIn: '1h' }
      );

      date.setHours(date.getHours() + 1);

      /*
      tokenList[newToken] = {
        user: user,
        expiration: date
      };
      */

      await setAsync(
        user,
        JSON.stringify({
          token: newToken,
          expiration: date
        })
      );

      return res.status(200).json({ token: newToken, tokenExpiration: 1 });
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

function getAsync(key) {
  return new Promise(function(resolve, reject) {
    authControlRedis.get(key, (error, data) => {
      if (error) reject(error);
      if (data === null) reject();

      resolve(JSON.parse(data));
    });
  });
}

function setAsync(key, value) {
  return new Promise(function(resolve, reject) {
    authControlRedis.set(key, value, error => {
      if (error) reject(error);
      resolve();
    });
  });
}

async function checkTokenValidation(user, token) {
  try {
    const data = await getAsync(user);

    if (token !== data.token) {
      throw Error;
    }

    const currentDate = new Date();
    const expirationDate = new Date(data.expiration);

    if (currentDate > expirationDate) {
      throw Error;
    }
  } catch (error) {
    return {
      isValid: false,
      errorMessage: 'Invalid token'
    };
  }

  return {
    isValid: true
  };
}
