var express = require('express');
var router = express.Router();
const db = require('../model/helper')
const mustExist = require("../guards/mustExist");
const mustNotExist = require("../guards/mustNotExist");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const resultsObject = await db("SELECT * FROM users;")
    const users = resultsObject.data;
    res.send(users);
  }catch(err) {
    res.status(500).send(err);
  }
});


// get user by id
router.get('/:id', async function(req, res, next) {
  console.log("getting a particular user")
  try {
    const {id} = req.params;
    const user = await db(`SELECT * FROM users WHERE id= "${id}";`)
    res.send(user.data[0]);
  }catch (err) {
    res.status(500).send(err);
  }
});



//get users's gastos
router.get('/:id/gastos', mustExist("id", "users", "id"), async function(req, res, next) {
try {
  const {id} = req.params;
  const gastos = await db(`SELECT * FROM gastos WHERE gastos.userID = ${id});`)
  res.send(gastos.data);
}catch (err) {
  res.status(500).send(err);
}
});



//post a new user.  userName should be unique so we have middleware to check this. the mustNotExist function builds a 
// custom guard function based on the table and column name you want to check against
router.post('/',  mustNotExist("userName", "users", "userName"), async function(req, res, next) {
  console.log(!req.body.userName || !req.body.password)
  if (!req.body.userName){
    res.status(400).send({msg: "Submission does not contain a valid 'userName' and/or 'password' properties"})
  }
  const {userName, password} = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(`INSERT INTO users (userName, password) values ("${userName}", "${hash}");`)
    res.send({msg: `User '${userName}' successfully registered`});
  } catch (err){
    res.status(500).send(err)
  }  
});


// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const hash = await bcrypt.hash(password, saltRounds);

//     await db(
//       `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
//     );

//     res.send({ message: "Register successful" });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });


// delete a user base on their id.
router.delete('/:id', mustExist("id", "users", "id"), async function(req, res, next) {
  try {
    const {id} = req.params;
    await db(`DELETE FROM users WHERE id="${id}";`)
    res.send({msg: `User with id '${id}' successfully deleted from database`});
  } catch (err){
    console.log(err)
    res.status(500).send(err)
  }
});



module.exports = router;


