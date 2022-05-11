import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import '../stylesheets/chat.css'
import socket from "../util/socket_client_util";

const Chat = (props) => {
  console.log(props)
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUser = useSelector(state => state.session.user)
  //sets roomKey from props or global
  const roomKey = props.roomKey || 'global'

  const handle = currentUser.handle || 'user'
  
  // disconnects from socket when component will unmount
  useEffect(() => {
    socket.emit("joinRoom", { roomKey: roomKey, handle: handle})

    socket.on("userJoinedRoom", (data) => console.log(data))

    return () => socket.emit("leaveRoom", {roomKey: roomKey, handle: handle});
  }, []);

  useEffect(() => {

    socket.on("serverMessage", (data) => console.log(data));
    socket.on("sendRoomMsgServer", (data) => {
      console.log(data)
      setMessageList(messageList => [...messageList, data])
    })
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('sendRoomMsgClient', { message: message, roomKey: roomKey, handle: handle});
    console.log("client message sent")
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <ul>
          {messageList.map((data, idx) => {
            console.log(data)
            return (
              <li key={idx} className="chat-message">
                {data.handle}: {data.message}
              </li>

            )
          })}
        </ul>
      </div>
      <input type="text" onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat;