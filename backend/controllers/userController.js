const { getUsers, setUsers, getUsersLength } = require('../utils/dataStorage');

const addUser = (req, res) => {
    try {
        const user = req.body;

        const users = getUsers();

        user.id = users.length + 1;

        users.push(user);

        setUsers(users);

        res.status(200).json({ message: "User added Successfully" });
    } catch (error) {
        console.error("Error : " + error);
        res.status(404).json({ message: "Error occured" });
    }
}
const getUser = (req, res) => {
    try {
        const users = getUsers();
        res.status(200).send(users);
    } catch (error) {
        console.error("Error : " + error);
        res.status(404).json({ message: "Error occured" });
    }
}

module.exports = { addUser, getUser };