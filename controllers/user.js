const UserService = require('../services/user');

module.exports = {

    async store(req, res) {
        const { name, password, email } = req.body;

        const user = await UserService.createUser(name, password, email);

        return res.json({ user });
    },

    async delete(req, res) {
        const { userId } = req.params;

        const user = await UserService.deleteUser(userId);

        return res.json({ user });
    },

    async update(req, res) {
        const { userId } = req.params;
        const { name, password, email } = req.body;

        const user = await UserService.updateUser(userId, name, password, email);

        return res.json({ user });
    },

};