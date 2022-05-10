import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5002"

function Timer() {
  const [response, setResponse] = useState("");
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    })

    return () => socket.disconnect();
  }, []);


  return (
    <>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </>
  )
}

export default Timer;