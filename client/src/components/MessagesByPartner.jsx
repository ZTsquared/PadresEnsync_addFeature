import {useState, useEffect} from 'react'
import { Navigate, useParams, useOutletContext } from "react-router-dom";
import Pusher from "pusher-js"; // node_modules/pusher
import './MessagesByPartner.css'

const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;


function MessagesByPartner() {

  const {partnerID} = useParams();
  const partnerName = useOutletContext();
  const [messageHistory, setMessageHistory] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [user_id, setUser_id] = useState("0")


  //userID should probably be grabbed from local storage and saved in state...

  // useEffect((() => {console.log(messages)}), [messages])

  useEffect((() => {setUser_id(+localStorage.getItem("user_id"))}), [])
  useEffect((() => {setMessages([])}), [partnerID])
  useEffect((() => {getMessageHistory()}), [partnerID, user_id])


  useEffect((() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher(PUSHER_KEY, {
      cluster: 'eu'
    });
    
    const chatters = [user_id, +partnerID].sort()
    const  channelName = `chat-${chatters[0]}-${chatters[1]}`


    let channelSubscription = pusher.subscribe(channelName);
    channelSubscription.bind('message', async function(data) {
      // alert(JSON.stringify(data));
      // console.log(data)
      setMessages((currentState)=>[...currentState, data]);
      // console.log(messages);
    });

    return () => {
      // channelSubscription.unbind()
      pusher.unsubscribe(channelName);
    };

  }), [partnerID, user_id])


  async function getMessageHistory() {
    //fetch message history between user_id in local storage and partnerID ordered by sent date
    //setMessageHistory
    try{
      // console.log(`/api/messages/recent?sender_id=${+localStorage.getItem("user_id")}&receiver_id=${partnerID}`)
      const resultObject = await fetch(`/api/messages/recent/?sender_id=${+localStorage.getItem("user_id")}&receiver_id=${partnerID}`)
      const data = await resultObject.json();
      setMessageHistory(data.reverse());
    } catch (err) {
      console.log("could not load message history")
      console.log(err)
    }
  }


  function handleInputChange (e) {
  
    setNewMessage(e.target.value)
  }


  async function handleSubmit (e) {
    e.preventDefault()
    // console.log(newMessage);
    //post message to pusher
    await sendMessage();
    setNewMessage("");
  }


  async function sendMessage () {
    try{
      const response = await fetch(`/api/chats/${user_id}/${partnerID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify({data:{message: newMessage}}),
        body: JSON.stringify({message: newMessage}),
      });
    }catch (err){
      console.log("message could not be sent")
      console.log(err)
    }

    try{
      const response = await fetch(`/api/messages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify({data:{message: newMessage}}),
        body: JSON.stringify({sender_id: user_id, receiver_id: partnerID, text: newMessage}),
      });
    }catch (err){
      console.log("message could not be saved")
      console.log(err)
    }
  }


  return (
    <div className="border border-2 rounded-3 p-2 mt-2">
      <div className="mt-2">Your conversation with {partnerName}:</div>
      {/* <div className="border border-2 rounded-3 p-2"> */}
      <div className="messages-container">
        {/* map through messageHistory then through messages.  show on left if from partner id, right if from user id */}
          {messageHistory.map((message, i) => <div key = {i} className = {(user_id === +message.sender_id) ? "message-div-from-me" : "message-div-from-other"}><div className = {(user_id === +message.sender_id) ? "message-from-me" : "message-from-other"}>{message.text}</div></div>)}
          {/* <div className = "new-message-break ">----- New Messages -----</div> */}
          {messages.map((message, i) => <div key = {i} className = {(user_id === +message.sender_id) ? "message-from-me" : "message-from-other"}>{message.text}</div>)}
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