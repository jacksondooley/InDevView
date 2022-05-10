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
			res.json(room)
		}
	})
}

const addParticipant = (req, res) => {
	Room.find({ room_key: req.params.room_key }, (err, targetRoom) => {
		if (err) {console.log(`this room does not exist`)}
		else {
			// const index = targetRoom.participants.indexOf(req.user.id);
			// if (index > -1) {
				targetRoom[0].participants.push(req.body.user)
				// targetRoom.save();
				
				res.json(targetRoom)
				// console.log(targetRoom[0].participants)
					// targetRoom.participants.push(req.body.user);
			// } else {
			// 	console.log(`You can't join a room twice!`)
			// }
			// targetRoom.save()
		}
	})
}

// const removeUserFromGroup = (req, res) => {
// 	Group.findById(req.params.groupId, (err, groupResult) => {
// 			const index = groupResult.users.indexOf(req.user.id);
// 			if (index > -1) {
// 					groupResult.users.splice(index, 1);
// 			}
// 		}
// 	)
// }

module.exports = {
		createRoom,
		fetchRoom,
		addParticipant
};