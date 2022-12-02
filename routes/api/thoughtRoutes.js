const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

//routes
router.route('/').get(getThoughts).post(createThought).put(updateThought);
router.route('/:thoughtId').get(getSingleThought).delete(removeThought);
router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;