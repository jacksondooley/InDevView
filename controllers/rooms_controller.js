const { render } = require("express/lib/response");
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
			if (!room.length)  {
				res.json(`room does not exist`)
			} else {
				res.json(room)
			}
		}
	})
}

const addParticipant = (req, res) => {
	Room.find({ room_key: req.params.room_key }, (err, targetRoom) => {
		if (err) {console.log(`this room does not exist`)}
		else {
				targetRoom[0].participants.push(req.body.user)
				targetRoom[0].save();
				res.json(targetRoom)
		}
	})
}

const removeParticipant = (req, res) => {
	Room.find({ room_key: req.params.room_key }, (err, targetRoom) => {
		if (err) {console.log(`this room does not exist`)}
		else {
			const index = targetRoom[0].participants.indexOf(req.body.userId);
			if (index > -1) {
					targetRoom[0].participants.splice(index, 1);
					targetRoom[0].save()
					res.json(targetRoom)
			} else {
				console.log("User not in room")
			}
		}
	})
}

const destroyRoom = (req, res) => {
	Room.deleteOne({ _id: req.body.roomId }, (err, destroyedRoom) => {
		console.log(`req: ${req}`);
		console.log(`req.body.roomId: ${req.body.roomId}`)
		if (err) {console.log(`could not delete room`)}
		else {
			console.log(`room successfully destroyed`)
			res.json(
				destroyedRoom
			)
		}
	})
}

module.exports = {
		createRoom,
		fetchRoom,
		addParticipant,
		removeParticipant,
		destroyRoom
};

