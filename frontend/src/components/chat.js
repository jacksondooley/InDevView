import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5002"
const socket = io();

const Chat = () => {
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const currentUser = useSelector(state => state.session.user)

  // disconnects from socket when component will unmount
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {

    socket.on("serverMessage", (data) => console.log(data));
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList(messageList => [...messageList, data])
    })
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send_message', { message: message, handle: currentUser.handle});
    console.log("test");
  }

  return (
    <>
      <ul>
        {messageList.map((data, idx) => {
          console.log(data)
          return (
            <li key={idx}>{data.handle}: {data.message}</li>
            
            )
          })}
      </ul>
      <input type="text" onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </>
  )
}

export default Chat;