const express = require("express")
const app = express()



// backend imports
const db = require('./config/keys').mongoURI
const mongoose = require('mongoose')
const users = require("./routes/api/users")
const questions = require("./routes/api/questions")
const rooms = require("./routes/api/rooms")
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const { join } = require("path");
const cors = require('cors')


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('frontend/build'));
//     app.get('/', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     })
// }

mongoose
    .connect(db, { useNewUrlParser: true})
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch(err => console.log(err))

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/rooms', rooms);
app.use("/api/users", users);
app.use("/api/questions", questions);

// websocket import
const index = require('./routes/index')
app.use("/index", index)


const port = process.env.PORT || 5001;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
const io = require('socket.io')(server, { cors: {origin: "*"}});


let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id)

    socket.emit('serverMessage', "Connected to Backend");
    socket.broadcast.emit('serverMessage', "User has connected");

    socket.on("joinRoom", (data) => {
        socket.join(data.roomKey)
        socket.emit("userJoinedRoom", `${data.userHandle} has joined ${data.roomKey}`)
    })

    socket.on("sendRoomMsgClient", (data) => {
        console.log(data)
        io.to(data.roomKey).emit("sendRoomMsgServer", data)
    })

    socket.emit("userJoinedRoom", )
    socket.on('send_message', (data) => {
        console.log(data)
        io.emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
})



// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/app.html');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// })

// server.listen(5001, () => {
//   console.log('listening on *:3000');
// })



