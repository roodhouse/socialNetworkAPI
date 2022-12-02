const { Schema, model } = require('mongoose');
const thoughtSchema     = require('./Thought');
const { isEmail }       = require('validator'); // not sure I've done this correct

const userSchema = new Schema(
    {
        username: {
            type    : String,
            required: true,
            unique  : true,
            trim    : true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: [ isEmail, 'invalid email'] // not sure I've done this correct
            }
        },
        thoughts: [thoughtSchema],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

// virtual
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`
    });

// init model
const User = model('user', userSchema);

module.exports = User;