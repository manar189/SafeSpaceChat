const User = require("../models/userModel");

// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
//process.env.SECRET_KEY = 'secret'

module.exports = async function login(req, res) {
  await User.findOne({email: req.email})
  .then((user)=>{
      if(!user){
        return res.status(400).json({
          status: 'error',
          error: 'Wrong email!',
        });
      }

      if(!(req.password == user.password)){
        return res.status(400).json({
          status: 'error',
          error: 'Incorrect password!',
        });
      } 
      else{
        res.status(200).json({
          status: 'succes',
          data: { 
            userId: user._id,
            isSupervisor: user.isSupervisor
          }
        });
      }
      
  })
  .catch(err => console.log('Error in login', err))
}

// user.findOne({
//     email: req.body.email
//   })
//   .then(user => {
//     if (!user) {
//       bcrypt.hash(req.body.password, 10, (err, hash) => {
//         userData.password = hash,
//           User.create(userData)
//           .then(user => {
//             res.json({
//               status: user.email + "has registered!"
//             })
//           })
//           .catch(err => {
//             res.send("error" + err)
//           })
//       })
//     } else {
//       res.json({
//         error: "user alredy exists!"
//       })
//     }
//   })
//   .catch(err => {
//     res.send("error" + err)
//   })


// })

// /*router.get('/test', (req, res) => {
// res.json({
//   message: "hejhej"
// })

// })*/


// router.post('/login', (req, res) => {
// console.log(req)
// User.findOne({
//     email: req.body.email

//   })

//   .then(user => {
//     console.log(user)
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         const payload = {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email
//         } 
//         let token = jwt.sign(payload, process.env.SECRET_KEY, {
//           expiresIn: 1400
//         })
//         res.send(token)
//       } else {
//         res.json({
//           error: "user does not exist!"
//         })
//       }
//     } else {
//       res.json({
//         error: "user does not exist!"
//       })
//     }
//   })
//   .catch(err => {
//     res.send('error' + err)
//   })
// })

// module.exports = router