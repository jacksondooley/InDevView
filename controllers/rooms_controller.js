const Room = require("../models/Room");
const User = require("../models/User");

const createRoom = (req, res) => {
	const newRoom = new Room({
			host_id: req.user.id,
			room_key: Math.floor(100000 + Math.random() * 900000),
			participants: [req.user],
			questions: {...req.questions}
	});

	newRoom.save()
			.then((newRoom) => res.json(newRoom));
};

module.exports = {
    createRoom
};

// const fetchRoom = (req, res) => {
// 	const room
// }
