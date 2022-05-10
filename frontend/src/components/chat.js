import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5002"
const socket = io();

const Chat = () => {
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // disconnects from socket when component will unmount
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    })

    socket.on("serverMessage", (data) => console.log(data));
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList(messageList => [...messageList, data.message])
    })
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('send_message', { message: message});
    console.log("test");
  }

  return (
    <>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <input type="text" onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messageList.map((msg, idx) => <li key={idx}>{msg}</li>)}
      </ul>
    </>
  )
}

export default Chat;