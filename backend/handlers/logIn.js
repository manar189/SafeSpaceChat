const User = require("../models/userModel")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const express = require("express");
const router = express.Router();

process.env.SECRET_KEY = 'secret'


router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    fullName: req.body.username,
    password: req.body.password,
    email: req.body.email,
    created: today
  }
  user.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash,
            User.create(userData)
            .then(user => {
              res.json({
                status: user.email + "has registered!"
              })
            })
            .catch(err => {
              res.send("error" + err)
            })
        })
      } else {
        res.json({
          error: "user alredy exists!"
        })
      }
    })
    .catch(err => {
      res.send("error" + err)
    })


})

/*router.get('/test', (req, res) => {
  res.json({
    message: "hejhej"
  })

})*/


router.post('/login', (req, res) => {
  console.log(req)
  User.findOne({
      fullName: req.body.username

    })

    .then(user => {
      console.log(user)
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1400
          })
          res.send(token)
        } else {
          res.json({
            error: "user does not exist!"
          })
        }
      } else {
        res.json({
          error: "user does not exist!"
        })
      }
    })
    .catch(err => {
      res.send('error' + err)
    })
})

module.exports = router