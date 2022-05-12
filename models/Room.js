const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
		host_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		room_key: {
			type: Number,
			require: true
		},
		interviewers: {
			type: Array
		},
		interviewees: {
			type: Array
		},
		questions: {
			type: Array,
			require: true
		},
		time: {
			type: Number,
			require: true
		},
    date: {
			type: Date,
			default: Date.now
	}
});

module.exports = Room = mongoose.model('Room', RoomSchema);

