const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {getRandomName} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    //Drop users
    await User.deleteMany({});

    //Drop thoughts
    await Thought.deleteMany({});

    // New empty user array
    const users = []

    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const first    = fullName.split(' ')[0];
        const last     = fullName.split(' ')[1];

        users.push({
            first,
            last
        });
    }

    // Add user to collection
    await User.connection.insertMany(users);

    // Log out the seed data to indicate what should appear in database
    console.table(users);
    console.info('Seeding complete');
    process.exit(0);
});