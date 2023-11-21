var express = require('express');
var router = express.Router();
const db = require("../model/helper");

const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const mustExist = require("../guards/mustExist")

router.get("/", async (req, res) => {
    // Send back the full list of messages
    try {
        const resultObject = await db("SELECT * FROM messages;");
        const messages = resultObject.data;
        console.log(resultObject.data)
        res.send(messages);
    } catch (err) {
        console.error("Error downloading messages:", err);
        res.status(500).send(err.message);
    }
  });

  
  router.get("/recent", async (req, res) => {
    // Send back recent message history
    console.log(req.query)
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;
    try {
        const resultObject = await db(`SELECT * FROM messages where 
          (sender_id = ${sender_id} AND receiver_id = ${receiver_id}) 
          OR (sender_id = ${receiver_id} AND receiver_id = ${sender_id}) 
          ORDER BY id DESC LIMIT 10
          ;`);
        const messages = resultObject.data;
        console.log(resultObject.data)
        res.send(messages);
    } catch (err) {
        console.error("Error downloading messages:", err);
        res.status(500).send(err.message);
    }
  });


router.post("/", userMustBeLoggedIn, mustExist ("receiver_id", "users", "id"), mustExist ("sender_id", "users", "id"), async function(req, res) {
  
    const {sender_id, receiver_id, text} =  req.body;
    // console.log("-----------")
    // console.log("-----------")
    // console.log(sender_id, receiver_id, text)
    // console.log("-----------")
    // console.log("-----------")
  
    try {
      const resultObject = await db(
        // `INSERT INTO gastos (dateExpense, description, total, userId) VALUES ('${dateExpense}', '${description}', '${total}', '${userId}');`
        `INSERT INTO messages (sender_id, receiver_id, text, createdAt, updatedAt)
         VALUES ('${sender_id}', '${receiver_id}', "${text}", "2023-04-22 10:34:53.44", "2023-04-22 10:34:54.44");`
        );
        // console.log("-----------")
        // console.log(resultObject)
        // console.log("-----------")
        res.status(201).send({ message: "New message stored correctly"});
    } catch (err) {
      res.status(500).send(err);
    }
  });


module.exports = router;