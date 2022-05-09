const express = require("express")
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

const db = require('./config/keys').mongoURI
const mongoose = require('mongoose')
const users = require("./routes/api/users")
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


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

app.use("/api/users", users)

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

const port = process.env.PORT || 5001;

app.listen(port, console.log(`Server is running on port ${port}`));
