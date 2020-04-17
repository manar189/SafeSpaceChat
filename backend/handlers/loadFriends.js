const User = require('../models/userModel');

module.exports = async function loadFriends(userId, friends){
    await User.findById(userId)
        .populate('friends')
        .then((user) => {
            friends.json(user.friends);
        })
        .catch(err => console.log('Error fetching data', err));
};