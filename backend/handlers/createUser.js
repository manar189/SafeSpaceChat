const User = require('../models/userModel');

const addFriend = require('./addFriend');
const createConversation = require('./createConversation');

module.exports = async function createUser(req, res) {    
    await User.findOne({ email: req.email }).then(
        (user) => {
          if (user) {
            return res.status(400).json({
                status: 'error',
                error: 'Email already in use',
              });
          }
          else{
            const newUser = new User({
              fullName: req.fullName,
              email: req.email,
              password: req.password,
              isSupervisor: req.isSupervisor,
            });
            newUser.save()
            .then( savedUser => {
                if(!savedUser.isSupervisor){
                    const addReq = {
                        userOne: savedUser._id,
                        userTwo: req.supervisorId,
                    }
                    createConversation(addReq);
                    addFriend(addReq);
                    User.findById(req.supervisorId)
                    .then((supervisor) => {
                        supervisor.supervisions.push(savedUser);
                        supervisor.save();
                    })
                }
            
                
            })
            res.status(200).json({
                status: 'succes',
                data: newUser._id,
              })
          }
        });
}
