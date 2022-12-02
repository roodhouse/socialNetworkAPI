const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser).put(updateUser);

router.route('/:userId').get(getSingleUser).delete(removeUser);

module.exports = router;