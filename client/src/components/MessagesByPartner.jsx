import {useState, useEffect} from 'react'
import { Navigate, useParams, useOutletContext } from "react-router-dom";
import Pusher from "pusher-js"; // node_modules/pusher

const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;


function MessagesByPartner() {

  const {partnerID} = useParams();
  const partnerName = useOutletContext();
  const [messageHistory, setMessageHistory] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect((() => {console.log(partnerName)}), [])
  useEffect((() => 
    {
      Pusher.logToConsole = true;

      var pusher = new Pusher(PUSHER_KEY, {
        cluster: 'eu'
      });
  
      var channelSubscription = pusher.subscribe('my-channel');
      channelSubscription.bind('message', async function(data) {
        alert(JSON.stringify(data));
        // console.log("--------------")
        // console.log("--------------")
        // console.log("--------------")
        // console.log(data)
        // console.log(JSON.stringify(data))
        // console.log("--------------")
        // console.log("--------------")
        // console.log("--------------")
        try{
          const response = await fetch(`/api/messages/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(data), // Cuerpo de la solicitud en formato JSON
          });
          // console.log("after the fetch")
          // console.log(response)
        }catch (err){
          console.log("posting inbound message to database failed")
          console.log(err)
        }
      });

      return () => {
        pusher.unsubscribe("my-channel");
      };
    }
  ), [partnerID])

  async function getMessageHistory() {
    //fetch message history between user_id in local storage and partnerID ordered by sent date
    //setMessageHistory
  }

  function handleInputChange (e) {
    setNewMessage(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    console.log(newMessage);
    //post message to pusher
    sendMessage();
    setNewMessage("");
  }

  async function sendMessage () {
    console.log("in sendMessage")
    try{
      console.log("in sendMessage try")
      console.log(JSON.stringify({message: newMessage}))
      const response = await fetch(`/api/chats/${localStorage.getItem("user_id")}/${partnerID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify({data:{message: newMessage}}),
        body: JSON.stringify({message: newMessage}),
      });
      console.log("after the fetch")
      console.log(response)
    }catch (err){
      console.log("message could not be sent")
      console.log(err)
    }
  }


  return (
    <div className="border border-2 rounded-3 p-2 mt-2">
      <div className="mt-2">Your conversation with {partnerName}:</div>
      <div className="border border-2 rounded-3 p-2">
        {/* map through messageHistory.  show on left if from partner id, right if from user id */}
        <div>map message history</div>
        <div>map message history</div>
        <div>map message history</div>
        <div>map message history</div>
      </div>
      <div className="mt-4">Send {partnerName} a new message:</div>
      <form action="Submit" onSubmit = {handleSubmit} className="input-group">
        <input type="text" value = {newMessage} onChange = {handleInputChange} className="form-control border-2"/>
        <button className="btn btn-outline-secondary" disabled = {!newMessage}>Send</button>
      </form>
      
    </div>
  )
}

export default MessagesByPartner