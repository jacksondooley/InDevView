const Room = require("../models/Room");
const User = require("../models/User");

const createRoom = (req, res) => {
	const newRoom = new Room({
			host_id: req.user.id,
			room_key: Math.floor(100000 + Math.random() * 900000),
			participants: [req.user],
			questions: req.body.questions
	});

	newRoom.save()
			.then((newRoom) => res.json(newRoom));
};

const fetchRoom = (req, res) => {
	Room.find({ room_key: req.params.room_key }, (err, room) => {
		if (err) {console.log(`this room does not exist`)}
		else {
			res.json(room)
		}
	})
}

module.exports = {
		createRoom,
		fetchRoom
};