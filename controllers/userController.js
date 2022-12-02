const { ObjectId }      = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate Function
const headCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                headCount: await headCount(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json({
                user
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Create new user <-- here
}