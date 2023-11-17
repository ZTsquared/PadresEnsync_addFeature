var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guards/mustExist");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt")

const supersecret = process.env.SUPER_SECRET;

router.post('/login',  mustExist("userName", "users", "userName"), async function(req, res, next) {
    if (!req.body.userName || !req.body.password){
      res.status(400).send({msg: "Submission does not contain a valid 'userName' and / or 'password' property"})
    }
    const {userName, password} = req.body;
    try {
      const resultObject = await db(`SELECT * FROM users where userName = "${userName}";`);
      if (resultObject.data.length > 1){
        res.send({msg: `Multiple entries found for userName '${userName}'`});
      } else {
        const user = resultObject.data[0];
        const user_id = user.id;
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
          res.send({msg: `Password incorrect`});
        } else {
          const token = jwt.sign({ user_id }, supersecret);
          res.send({ message: "Login successful, here is your token", token });
        }
      }
    } catch (err){
      res.status(500).send(err)
    }  
  });


  module.exports = router;