const NoteModel = require('../models/note');
const UserModel = require('../models/user');

module.exports = {
  async getAllNotes(userId) {
    try {
      const user = await UserModel.findOne({ id: userId });
      if (!user) throw new Error('User does not exists');

      const notes = await NoteModel.find({ creator: user });

      return { notes };
    } catch (error) {
      throw error;
    }
  },

  async getSingleNote(noteId) {
    try {
      const note = await NoteModel.findById(noteId);
      return { note };
    } catch (error) {
      throw error;
    }
  },

  async createNote(title, description, userId) {
    try {
      const user = await UserModel.findOne({ id: userId });
      if (!user) throw new Error('User does not exists');

      const createdNote = await NoteModel.create({
        title,
        description,
        creator: user
      });

      return { createdNote };
    } catch (error) {
      throw error;
    }
  },

  async deleteNote(noteId) {
    try {
      //NoteModel.findByIdAndRemove()
      const deletedNote = await NoteModel.deleteOne({ _id: noteId });

      return { deletedNote };
    } catch (error) {
      throw error;
    }
  },

  async updateNote(noteId, title, description) {
    try {
      //NoteModel.findByIdAndUpdate()
      const updatedNote = await NoteModel.updateOne(
        { _id: noteId },
        { title, description }
      );

      return { updatedNote };
    } catch (error) {
      throw error;
    }
  }
};
