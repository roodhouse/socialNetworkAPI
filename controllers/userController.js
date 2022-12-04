const { ObjectId } = require('mongoose').Types;
const  User        = require('../models/User');

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
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: req.body }
        )
    },
    removeUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId})
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // add thought to user
    addThought(req, res) {
        console.log('You are adding a thought');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { thoughts: req.body }},
            {runValidators: true, new: true}
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove thought
    removeThought(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: { thought: {thoughtId: req.params.thoughtId}}},
            {runValidators: true, new: true}
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // add friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { friends: req.body }},
            {runValidators: true, new: true}
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove Friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: { friend: {friendId: req.params.friendId}}},
            {runValidators: true, new: true}
        )
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({message: 'No user found with that ID'})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
};