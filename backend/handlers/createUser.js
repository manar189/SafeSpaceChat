const User = require('../models/userModel');

const addFriend = require('./addFriend');
const createConversation = require('./createConversation');

module.exports = async function createUser(req, res) {
  if(req.isSupervisor && req.email != '') {
    await User.findOne({ email: req.email }).then(
      (user) => {
        if (user) {
          return res.status(400).json({
              status: 'error',
              error: 'Upptagen epost',
            });
        }
    })
    .catch(err => {console.log('Error in createUser 1', err)})
  }
  
  let userReq;
  if(req.email){
    userReq = {
      fullName: req.fullName,
      email: req.email,
      password: req.password,
      isSupervisor: req.isSupervisor,
    }
  }
  else{
    userReq = {
      fullName: req.fullName,
      password: req.password,
      isSupervisor: req.isSupervisor,
    }
  }

  const newUser = new User(userReq);
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
  .catch(err => {console.log('Error in createUser 2', err)})
  res.status(200).json({
      status: 'succes',
      data: {
          userId: newUser._id
      } 
  })
}
