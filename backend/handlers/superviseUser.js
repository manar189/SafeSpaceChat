const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

module.exports = async function superviseUser(userId, res){

    await User.findById(userId)
        .populate({
            path    : 'conversations',
            populate: [
                { path: 'userOne' },
                { path: 'userTwo' },
                { path: 'messages' }
            ]
        })
        .then((user) => {
            if(!user){
                return res.status(400).json({
                    status: 'error',
                    error: 'User not in DB',
                });
            }
            
            res.status(200).json({
                status: 'succes',
                data: user.conversations.map((conversation) => {
                    let name;
                    let date;

                    if(conversation.userOne._id.equals(userId)){
                        name = conversation.userTwo.fullName;
                    }
                    else if(conversation.userTwo._id.equals(userId)){
                        name = conversation.userOne.fullName;
                    }
                    else{
                        console.log('Something went wrong in superviseUser');
                    }

                    if(conversation.messages.length > 0){
                        date = conversation.messages[conversation.messages.length - 1].createdAt;
                    }
                    else{
                        date = '';
                    }

                    return ({
                        fullName: name,
                        nMessages: conversation.messages.length,
                        messageDate: date
                    })
                })
            })
        })
        .catch(err => console.log('Error fetching data in superviseUser ', err));
    }
