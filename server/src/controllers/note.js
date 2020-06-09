const { check, validationResult } = require('express-validator');

const NoteModel = require('../models/Note');
const UserModel = require('../models/User');
const { cacheRedis } = require('../redis/');
const { setAsync } = require('../utils/redisQuery');
const { checkTokenValidation } = require('../utils/token');

module.exports = {
  async index(req, res) {
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

    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User does not exists');

      const notes = await NoteModel.find({ creator: user });

      await setAsync(cacheRedis, user.id, notes);

      return res.status(200).json({ notes });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async show(req, res) {
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { noteId } = req.params;

    try {
      const note = await NoteModel.findById(noteId);

      const userId = note.creator._id;

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

      return res.status(200).json({ note });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async store(req, res) {
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

    const { title, description } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User does not exists');

      const createdNote = await NoteModel.create({
        title,
        description,
        creator: user
      });

      return res.status(201).json({ note: createdNote });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async delete(req, res) {
    if (!req.isAuthenticated) {
      return res.status(401).json({ message: 'User is not authenticated' });
    }

    const { noteId } = req.params;

    try {
      const note = await NoteModel.findById(noteId);
      console.log('note ', note);
      const userId = note.creator._id;
      console.log('user ', userId);

      if (req.userId !== userId.toString()) {
        return res
          .status(401)
          .json({ message: 'User is not authorized to perform this action' });
      }

      const { isValid, errorMessage } = await checkTokenValidation(
        userId.toString(),
        req.token
      );
      console.log('is valid ', isValid);
      if (!isValid) {
        console.log('message ', errorMessage);
        return res.status(401).json({ message: errorMessage });
      }

      await NoteModel.findByIdAndDelete(noteId);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(204).end();
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

    const { noteId } = req.params;

    try {
      const note = await NoteModel.findById(noteId);
      const userId = note.creator._id;

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

      const { title, description } = req.body;

      await NoteModel.findByIdAndUpdate(noteId, { title, description });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(204).end();
  },

  validate: function validate(method) {
    switch (method) {
      case 'index':
        return [check('userId', 'UserId does not exists').exists()];
      case 'store':
        return [
          check('userId', 'UserId does not exists').exists(),
          check(
            'description',
            'Description is invalid or does not exists'
          ).exists()
        ];
      case 'update':
        return [
          check(
            'description',
            'Description is invalid or does not exists'
          ).exists()
        ];
    }
  }
};
