const NoteModel = require('../models/note');
const UserModel = require('../models/user');

module.exports = {
  async getAllNotes(userId) {
    const user = await UserModel.findOne({ id: userId });
    const notes = await NoteModel.find({ creator: user });
    return { notes };
  },

  async getSingleNote(noteId) {
    const note = await NoteModel.findById(noteId);
    return { note };
  },

  async createNote(title, description, userId) {
    const user = await UserModel.findOne({ id: userId });
    const createdNote = await NoteModel.create({
      title,
      description,
      creator: user
    });

    return { createdNote };
  },

  async deleteNote(noteId) {
    //NoteModel.findByIdAndRemove()
    const deletedNote = await NoteModel.deleteOne({ _id: noteId });

    return { deletedNote };
  },

  async updateNote(noteId, title, description) {
    //NoteModel.findByIdAndUpdate()
    const updatedNote = await NoteModel.updateOne(
      { _id: noteId },
      { title, description }
    );

    return { updatedNote };
  }
};
