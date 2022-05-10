import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5002"

// const socket = io(ENDPOINT)

// function Timer() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);
//     socket.on("fromClick", newCount => {
//       setCount(newCount)
//     })

//     return () => socket.disconnect();
//   }, []);


//   return (
//     <>
//       <p>
//         It's <time dateTime={response}>{response}</time>
//       </p>
//       <p>
//         Count: {newCount}
//         <button onClick={ }>Add 1</button>
//       </p>
//     </>
//   )
// }

// export default Timer;