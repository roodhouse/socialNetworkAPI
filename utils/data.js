const names = [
    'Aaron',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

// Get random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get random name
const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`


module.exports = { getRandomName };