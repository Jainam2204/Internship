const { getUsers, setUsers } = require('../utils/dataStorage');

const addUserDetails = (req, res) => {
    try {
        const user = req.body;

        const users = getUsers();

        user.id = users.length + 1;
        user.status = true;

        users.push(user);

        setUsers(users);

        return res.status(200).json({
            success: true,
            message: "User added Successfully"
        });
    } catch (error) {
        console.error("Error in addUser : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in addUser"
        });
    }
}

const getUserDetails = (req, res) => {
    try {
        const users = getUsers();
        return res.status(200).json({
            success: true,
            body: users
        });
    } catch (error) {
        console.error("Error in getUserDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in getUserDetails"
        });
    }
}

const getUser = (req, res) => {
    try {
        const id = Number(req.params.id);
        const users = getUsers();

        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            body: user
        });
    } catch (error) {
        console.error("Error in getUser : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in getUser"
        });
    }
}

const updateUserDetails = (req, res) => {
    try {
        const data = req.body;
        const id = Number(req.params.id);
        const users = getUsers();

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        data.id = users[index].id;
        data.stutus = users[index].status;
        users[index] = data;

        setUsers(users);

        return res.status(200).json({
            success: true,
            message: "User updated successfully"
        });

    } catch (error) {
        console.error("Error in updateUserDetails : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in updateUserDetails"
        });
    }
}

const changeUserStatus = (req, res) => {
    try {
        const id = Number(req.params.id);
        const users = getUsers();

        const index = users.findIndex((user) => user.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        users[index].status = users[index].status ? false : true;

        setUsers(users);

        return res.status(200).json({
            success: true,
            message: "User status updated successfully"
        });

    } catch (error) {
        console.error("Error in changeUserStatus : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in changeUserStatus"
        });
    }
}

const checkEmail = (req, res) => {
    try {
        const email = req.body;
        const users = getUsers();

        const user = users.find((user) => user.email === email);

        if (user) {
            return res.status(404).json({
                success: false,
                message: "Email exists"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email not exists"
        });

    } catch (error) {
        console.error("Error in changeUserStatus : " + error);
        res.status(404).json({
            success: false,
            message: "Error occured in changeUserStatus"
        });
    }
}

module.exports = {
    addUserDetails,
    getUserDetails,
    updateUserDetails,
    changeUserStatus,
    getUser,
    checkEmail
};