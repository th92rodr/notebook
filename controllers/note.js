const { check, validationResult } = require('express-validator');
const NoteService = require('../services/note');

module.exports = {
  async index(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    // get the current user id
    const { userId } = req.headers;

    // get all notes from this user
    const notes = await NoteService.getAllNotes(userId);

    // return a response with the notes
    return res.status(200).json({ notes });
  },

  async show(req, res) {
    // get the required note id
    const { noteId } = req.params;

    const note = await NoteService.getSingleNote(noteId);

    return res.status(200).json({ note });
  },

  async store(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { userId } = req.headers;
    const { title, description } = req.body;

    const note = await NoteService.createNote(title, description, userId);

    return res.status(200).json({ note });
  },

  async delete(req, res) {
    const { noteId } = req.params;

    const note = await NoteService.deleteNote(noteId);

    return res.status(200).json({ note });
  },

  async update(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { noteId } = req.params;
    const { title, description } = req.body;

    const note = await NoteService.updateNote(noteId, title, description);

    return res.status(200).json({ note });
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
