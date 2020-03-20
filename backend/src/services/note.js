const NoteModel = require('../models/Note');
const UserModel = require('../models/User');

module.exports = {
  /**
   * Gets all notes from a given user
   * @param {ID} userId
   */
  async getAllNotes(userId) {
    try {
      // Verify if the user exists
      const user = await UserModel.findOne({ id: userId });
      if (!user) throw new Error('User does not exists');

      const notes = await NoteModel.find({ creator: user });

      return { notes };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get data of a single given note
   * @param {ID} noteId 
   */
  async getSingleNote(noteId) {
    try {
      const note = await NoteModel.findById(noteId);

      return { note };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Creates a new note
   * @param {String} title 
   * @param {String} description 
   * @param {ID} userId 
   */
  async createNote(title, description, userId) {
    try {
      // Verify if the user exists
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

  /**
   * Deletes a given note
   * @param {ID} noteId 
   */
  async deleteNote(noteId) {
    try {
      //NoteModel.findByIdAndRemove()
      const deletedNote = await NoteModel.deleteOne({ _id: noteId });

      return { deletedNote };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Updates a given note
   * @param {ID} noteId 
   * @param {String} title 
   * @param {String} description 
   */
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
