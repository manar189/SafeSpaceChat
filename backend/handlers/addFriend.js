const User = require('../models/userModel');

module.exports = async function addFriend(req) {
    await User.findById(req.userOne).populate('friends').then(
        (user) => {
          if (user) {
            const isFriendExist = user.friends.filter(friend => (
                friend._id.equals(req.userTwo)
              ),
        ).length > 0;
            if (isFriendExist) {
              console.log('You already have this user as a friend'); 
            } else {
              User.findById(req.userTwo).then(
                (friend) => {
                  
                    user.friends.push(req.userTwo);
                    user.save();
                    friend.friends.push(req.userOne);
                    friend.save();
                });
            }
          } else {
            console.log('Cannot find user');
          }
        },
    );
}