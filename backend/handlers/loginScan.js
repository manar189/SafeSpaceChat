const User = require("../models/userModel")

module.exports = async function loginScan(userId, res) {
    await User.findById(userId)
    .then((user)=>{
        if(!user){
          return res.status(400).json({
            status: 'error',
            error: 'Något fel med QR-koden',
          });
        }
        // Create new connected user
        if(user.isSupervisor){
            res.status(200).json({
                status: 'succes',
                data: { 
                  createUser: true,
                  supervisorId: userId
                }
            });
        }
        // Sign into existing connected user
        else{
            res.status(200).json({
                status: 'succes',
                data: { 
                  createUser: false,
                  userId: userId
                }
            });
        }
    })
    .catch((err) => {
        console.log('Error in loginScan', err);
    })
  }