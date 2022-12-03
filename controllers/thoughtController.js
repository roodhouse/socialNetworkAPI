const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get sng thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'No thought with that ID'})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'No thought with that ID'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //remove a thought
    removeThought(res, req) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .catch((err) => res.status(500).json(err));
    },

    //add reaction
    addReaction(req, res) {
        Thought.reactions.create(req.body)
            .then((reaction) => res.json(reaction))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    //Remove reaction
    removeReaction(req, res) {
        Thought.reactions.findOneAndDelete({_id: req.params.reactionId})
        .catch((err) => res.status(500).json(err));
    }
};