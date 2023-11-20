import {useState, useEffect} from 'react'
import { Navigate, useParams, useOutletContext } from "react-router-dom";



function MessagesByPartner() {

  const {partnerID} = useParams();
  const partnerName = useOutletContext();
  const [messageHistory, setMessageHistory] = useState([])
  const [newMessage, setNewMessage] = useState("")

  useEffect((() => {console.log(partnerName)}), [])

  async function getMessageHistory() {
    //fetch message history between user_id in local storage and partnerID ordered by sent date
    //setMessageHistory
  }

  function handleInputChange () {
    //bind to newMessage state
  }

  return (
    <div>
      <div>Your conversation with {partnerName}:</div>
      <br />
      {/* map through messageHistory.  show on left if from partner id, right if from user id */}
      <div>map message history</div>
      <div>map message history</div>
      <div>map message history</div>
      <div>map message history</div>
      <br />
      <div>Send {partnerName} a new message:</div>
      <input type="text" />
    </div>
  )
}

export default MessagesByPartner