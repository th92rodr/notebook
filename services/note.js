const NoteModel = require('../models/note');

module.exports = {

    async getAllNotes(user) {
        const notes = await NoteModel.find({ creator: user });
        return { notes };
    },

    async getSingleNote(noteId) {
        const note = await NoteModel.findById(noteId);
        return { note };
    },

    async createNote(title, description, user) {
        const createdNote = await NoteModel.create({
            title,
            description,
            creator: user
        });

        return { createdNote };
    },

    async deleteNote(noteId) {
        await NoteModel.deleteOne({ _id: noteId });
    },

    async updateNote(noteId, title, description) {
        const updatedNote = await NoteModel.updateOne(
            { _id: noteId }, 
            { title, description }
        );

        return { updatedNote };
    },

};