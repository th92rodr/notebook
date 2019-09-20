const NoteService = require('../services/note');

module.exports = {

    async index(req, res) {
        // get the current user id
        const { userId } = req.headers;
    
        // get all notes from this user
        const notes = await NoteService.getAllNotes(userId);
    
        // return a response with the notes
        return res.json({ notes });
    },

    async show(req, res) {
        // get the required note id
        const { noteId } = req.params;

        const note = await NoteService.getSingleNote(noteId);

        return res.json({ note });
    },

    async store(req, res) {
        const { userId } = req.headers;
        const { title, description } = req.body;

        const note = await NoteService.createNote(title, description, userId);

        return res.json({ note });
    },

    async delete(req, res) {
        const { noteId } = req.params;

        const note = await NoteService.deleteNote(noteId);

        return res.json({ note });
    },

    async update(req, res) {
        const { noteId } = req.params;
        const { title, description } = req.body;

        const note = await NoteService.updateNote(noteId, title, description);

        return res.json({ note });
    },

};