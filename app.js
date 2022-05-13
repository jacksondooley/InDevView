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

const compile = require('./routes/api/compile')
app.use('/api/compile', compile)

// websocket import
const index = require('./routes/index')
app.use("/index", index)




const port = process.env.PORT || 5001;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
const io = require('socket.io')(server, { cors: {origin: "*"}});
const { fetchRoom } = require("./controllers/rooms_controller");
const Room = require("./models/Room");

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.emit('serverMessage', "Connected to Backend");
    socket.broadcast.emit('serverMessage', "User has connected");

    socket.on("joinRoom", (data) => {
        socket.join(data.roomKey)
        console.log(`${data.handle} has joined ${data.roomKey}`)
        io.emit("userJoinedRoom", `${data.handle} has joined ${data.roomKey}`)
    })

    socket.on("sendRoomMsgClient", (data) => {
        io.to(data.roomKey).emit("sendRoomMsgServer", data)
    })

    socket.on('send_message', (data) => {
        io.emit("receive_message", data);
    })


    socket.on("leaveRoom", (data) => {
        console.log(`${data.handle} has left ${data.roomKey}`)
        socket.leave(data.roomKey)
    })

    socket.on("fetchRoom", (data) => {
        Room.find({ room_key: data.roomKey})        
            .then(res => io.to(data.roomKey).emit("fetchRoomRes", res))
    })

    socket.on("changeStatus", (data) => {
        socket.join(data.roomKey)
        Room.find({ room_key: data.roomKey })
            .then(res => {
                console.log(res[0])
                res[0].interviewers = res[0].interviewers.map(interviewer => {
                    if (interviewer.id === data.userId) {
                        interviewer.status = interviewer.status === 0 ? 1 : 0
                        res[0].markModified('interviewers')
                    }
                    return (interviewer)
                })
                res[0].interviewee = res[0].interviewees.map(interviewee => {
                    if (interviewee.id === data.userId) {
                    interviewee.status = interviewee.status === 0 ? 1 : 0
                    res[0].markModified('interviewees')
                    }
                    return (interviewee)
                })
                res[0].save()
                io.to(data.roomKey).emit("fetchRoomRes", res)  
            })
    })

    socket.on("hostStart", (data) => {
        console.log("receive start")
        socket.join(data.roomKey)
        io.to(data.roomKey).emit("startInterview", data)
        // socket.leave(data.roomKey)
        socket.broadcast.emit("startInterview", {yes: "wee"});
    })

    socket.on("leaveLobby", (data) => {
        Room.find({ room_key: data.roomKey })
            .then(res => {
                const filteredInterviewers = res[0].interviewers.filter((user) => data.userId !== user.id)
                const filteredInterviewees = res[0].interviewees.filter((user) => data.userId !== user.id)
                res[0].interviewers = filteredInterviewers
                res[0].interviewees = filteredInterviewees
                res[0].save()
                io.to(data.roomKey).emit("fetchRoomRes", res)
            })
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



