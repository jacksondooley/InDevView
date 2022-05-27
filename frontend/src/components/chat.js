import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import '../stylesheets/chat.scss'
import {socket} from "../util/socket_client_util";

const Chat = (props) => {
  // console.log(props)
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUser = useSelector(state => state.session.user)
  //sets roomKey from props or global
  const roomKey = props.roomKey || 'global'

  const handle = currentUser.handle || 'user'
  // console.log(handle);
  
  // disconnects from socket when component will unmount
  useEffect(() => {



    socket.emit("joinRoom", { roomKey: roomKey, handle: handle, component: "chat"})

    // socket.on("userJoinedRoom", (data) => console.log(data))

    return () => socket.emit("leaveRoom", {roomKey: roomKey, handle: handle});
  }, []);

  useEffect(() => {

    window.addEventListener('keydown', (e => {
      if (e.key == 'Enter') {
        e.preventDefault();
        // console.log(e.key == 'Enter')
        sendMessage(e)
      }
    }))

    socket.on("sendRoomMsgServer", (data) => {
      // console.log(data)
      setMessageList(messageList => [...messageList, data])
    })
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault()
    if (message.length) {
      socket.emit('sendRoomMsgClient', { message: message, roomKey: roomKey, handle: handle});
      setMessage("")
    }
    // console.log("client message sent")
  }

  const isUser = (data, idx) => {
    if (data.handle == handle) { return (
        <li key={idx} id='user-msg' className="chat-message">
          <div id='user-bubble' className='msg-bubble'>
           {data.message}
          </div>
        </li>
      )} else { return (
      <li key={idx} id='friend-msg' className="chat-message">
        <small>
          {data.handle}
        </small>
        <br/>
        <div className='msg-bubble'>
         {data.message}
        </div>
      </li>
    )}
  }

  return (
    <div className="container">
      <div className="Main">
        <ul className='chat-messages-ul'>
          {messageList.map((data, idx) => {
            // console.log(isUser(data, idx))
            return isUser(data, idx)
          })}
        </ul>
      </div>
      <div className="input">
        <input 
          placeholder="send a message"
          className='chat-input' 
          type="text" 
          onChange={(e) => setMessage(e.target.value)}
          value={message}/>
      </div>
      <div className="send">
        <button onClick={sendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}

export default Chat;