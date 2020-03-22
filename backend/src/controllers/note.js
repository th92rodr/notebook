const { check, validationResult } = require('express-validator');

const NoteModel = require('../models/Note');
const UserModel = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { userId } = req.params;

      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User does not exists');

      const notes = await NoteModel.find({ creator: user });

      return res.status(200).json({ notes });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async show(req, res) {
    try {
      const { noteId } = req.params;
      const note = await NoteModel.findById(noteId);
      return res.status(200).json({ note });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async store(req, res) {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { userId } = req.params;
      const { title, description } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) throw new Error('User does not exists');

      const createdNote = await NoteModel.create({
        title,
        description,
        creator: user
      });

      return res.status(200).json({ createdNote });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { noteId } = req.params;
      await NoteModel.findByIdAndDelete(noteId);
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

      const { noteId } = req.params;
      const { title, description } = req.body;

      await NoteModel.findByIdAndUpdate(noteId, { title, description });

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
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
