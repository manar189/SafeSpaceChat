const User = require("../models/userModel")

module.exports = async function loginScan(req, res) {
    await User.findById(req.userId)
    .then((user)=>{
        if(!user){
          return res.status(400).json({
            status: 'error',
            error: 'Något fel med QR-koden',
          });
        }

        if(user.password === req.password){
            res.status(200).json({
                status: 'succes',
            });
        }
        // Sign into existing connected user
        else{
            res.status(400).json({
                status: 'error',
                error: 'Fel lösenord'
            });
        }
    })
    .catch((err) => {
        console.log('Error in loginScan', err);
    })
  }