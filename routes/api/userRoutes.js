const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addThought,
    removeThought,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

//routes
router.route('/').get(getUsers).post(createUser).put(updateUser);
router.route('/:userId').get(getSingleUser).delete(removeUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
router.route('/:userId/thought').post(addThought);
router.route('/:userId/thought/:thoughtId').delete(removeThought);
router.route('/:userId/thought').post(addThought);
module.exports = router; 