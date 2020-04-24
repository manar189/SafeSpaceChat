const User = require('../models/userModel');

let friendArray = [];

module.exports = async function loadFriends(userId, friends){
    await User.findById(userId)
        .populate('friends')
        .populate('conversations')
        .then((user) => {
            user.friends.forEach(friend => {
                user.conversations.forEach(conv => {
                    
                    if (friend._id.equals(conv.userOne) || friend._id.equals(conv.userTwo)) {

                        const item = {
                            label: friend.fullName,
                            userId: friend._id,
                            conversationId: conv._id,
                        }
                        friendArray.push(item);
                    }
                })
            })

            friends.json(friendArray);
        })
        .catch(err => console.log('Error fetching data in loadFriends', err));
};