var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const Pusher = require("pusher");

const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");


const pusher_channel = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
})


router.post(`/:sender_id/:receiver_id`, (req, res, next) =>{
    const {sender_id, receiver_id} = req.params;
    // const text = req.body.data.message;
    const text = req.body.message;

    //but this doesn't work with double digit?
    const chatters = [sender_id, receiver_id].sort()

    const channelName = `chat-${chatters[0]}-${chatters[1]}`


    pusher_channel.trigger(channelName, "message", {
        sender_id,
        receiver_id,
        text,
    });

    res.send({message: `message '${text}' sent from user ${sender_id} to user ${receiver_id}`})
})


module.exports = router;